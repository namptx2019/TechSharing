<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\SeriesRepository;
use App\Entities\Series;
use App\Presenters\SeriesPresenter;
use App\Validators\SeriesValidator;

use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use \Cviebrock\EloquentSluggable\Services\SlugService;

/**
 * Class SeriesRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class SeriesRepositoryEloquent extends BaseRepository implements SeriesRepository
{
    private $disk = 'public';

    protected $fieldSearchable = [
        'name' => 'like',
        'desc' => 'like',
        'category_id' => '='
    ];

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Series::class;
    }

    /**
     * Specify Validator class name
     *
     * @return mixed
     */
    public function validator()
    {

        return SeriesValidator::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    /**
     * Store poster
     * @param File $file
     * @param string $filename
     * @return string path
     */
    private function uploadPoster($file, $filename)
    {
        $extension  = $file->extension();
        $filename   = ''.Carbon::now()->timestamp.'_'.$filename.'.'.$extension;

        return Storage::disk($this->disk)->putFileAs('series-posters', $file, $filename);
    }

    /**
     * Remove poster of Category from disk
     * @param string $path
     */
    private function removePosterFromDisk($path)
    {
        $exists = Storage::disk($this->disk)->exists($path);

        if($exists){
            Storage::disk($this->disk)->delete($path);
        }

        return FALSE;
    }

    /**
     * Create new series
     * @param Request $request
     * @return Series
     */
    public function create($request)
    {
        $author     = $request->user();
        $author_id  = $author->id;

        //Upload poster
        $slug = SlugService::createSlug(Series::class, 'slug', $request->name);
        $path = $this->uploadPoster($request->file('poster'), $slug);

        //Preparing data before create
        $data = $request->all();

        $data['poster']     = $path;
        $data['created_by'] = (int)$author_id;
        $data['updated_by'] = (int)$author_id;
        $data['viewed']     = 0;

        return Series::create($data);
    }

    /**
     * Edit a Series
     * @param Request $request
     * @param integer $id
     * @return Series
     */
    public function update($request, $id)
    {
        $series = Series::find($id);
        $author = $request->user();
        $data   = $request->all();

        //If poster is changed
        if($request->file('poster') !== NULL){
            if(isset($data['name'])){
                $slug = SlugService::createSlug(Series::class, 'slug', $request->name);
            }
            else{
                $slug = SlugService::createSlug(Series::class, 'slug', $series->name);
            }

            $data['poster'] = $this->uploadPoster($request->file('poster'), $slug);
            $this->removePosterFromDisk($series->poster);
        }

        $data['updated_by'] = (int)$author->id;

        if(isset($data['name'])){
            $series->slug = NULL;
        }

        if($series->update($data)){
            return $series;
        }

        return [];
    }

    /**
     * Delete a series
     * @param integer $id
     * @return boolean
     */
    public function delete($id)
    {
        $series = Series::find($id);

        //Remove poster from disk
        $this->removePosterFromDisk($series->poster);

        return $series->delete();
    }

    /**
     * Get series popular
     *
     * @param int $limit
     *
     * @return Series
     */
    public function popular(int $limit)
    {
        return Series::orderBy('viewed', 'desc')->take($limit)->get();
    }

}
