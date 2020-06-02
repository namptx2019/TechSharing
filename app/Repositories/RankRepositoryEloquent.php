<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\RankRepository;
use App\Entities\Rank;
use App\Validators\RankValidator;
use App\Presenters\RankPresenter;

use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use \Cviebrock\EloquentSluggable\Services\SlugService;
/**
 * Class RankRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class RankRepositoryEloquent extends BaseRepository implements RankRepository
{
    /**
     * Define which disk storage in use
     */
    private $disk = 'public';

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Rank::class;
    }

    /**
     * Specify Validator class name
     *
     * @return mixed
     */
    public function validator()
    {

        return RankValidator::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    private function uploadMedal($file, $filename)
    {
        $extension  = $file->extension();
        $newFilename   = ''.Carbon::now()->timestamp.'_'.$filename.'.'.$extension;

        return Storage::disk($this->disk)->putFileAs('ranks', $file, $newFilename);
    }

    /**
     * Remove thumbnail of Rank from disk
     * @param string $path
     */
    private function removeThumbnailFromDisk($path)
    {
        $exists = Storage::disk($this->disk)->exists($path);

        if($exists){
            Storage::disk($this->disk)->delete($path);
        }

        return FALSE;
    }

    /**
     * Override method Repository->create() before store data
     * into database
     * @param Request $request
     */
    public function create($request)
    {
        $author = $request->user();

        //Upload thumbnail before store
        $slug = SlugService::createSlug(Rank::class, 'slug', $request->name);
        $path = $this->uploadMedal($request->file('medal'), $slug);

        //Get data from request
        $data = $request->all();

        $data = array(
            'name' => $request->name,
            'min_score' => $request->min_score,
            'max_score' => $request->max_score,
            'medal' => $path,
            'created_by' => (int)$author->id,
            'updated_by' => (int)$author->id,
        );

        return Rank::create($data);
    }

    /**
     * Override method Repository->update
     * @param Request $request
     * @param integer $id
     * @return Rank or Array null
     */
    public function update($request, $id)
    {
        $author = $request->user();
        $rank   = $this->find($id);
        $data   = $request->all();

        //If medal is changed
        $oldMedalName = $rank->medal;
        if($request->hasFile('medal')){
            $slug = SlugService::createSlug(Rank::class, 'slug', $request->name); //make sure that name always exists
            $data['medal'] = $this->uploadMedal($request->file('medal'), $slug);
        }

        $data['updated_by'] = (int)$author->id;

        if($rank->update($data)){
            if($request->hasFile('medal')) {
                $this->removeThumbnailFromDisk($oldMedalName);
            }
            return $rank;
        }

        return [];
    }

    /**
     * Delete a post
     * @param integer $id
     * @return boolean
     */
    public function delete($id)
    {
        $rank = Rank::find($id);

        //Remove thumbnail from disk
        $this->removeThumbnailFromDisk($rank->medal);

        return $rank->delete();
    }

}
