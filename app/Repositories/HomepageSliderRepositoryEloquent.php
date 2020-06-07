<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\HomepageSliderRepository;
use App\Entities\HomepageSlider;
use App\Validators\HomepageSliderValidator;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

/**
 * Class HomepageSliderRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class HomepageSliderRepositoryEloquent extends BaseRepository implements HomepageSliderRepository
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
        return HomepageSlider::class;
    }

    /**
     * Specify Validator class name
     *
     * @return mixed
     */
    public function validator()
    {

        return HomepageSliderValidator::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    /**
     * Method support upload thumbnail
     */
    public function upload($file)
    {
        $extension  = $file->extension();
        $filename   = ''.Carbon::now()->timestamp.'.'.$extension;

        return Storage::disk($this->disk)->putFileAs('sliders', $file, $filename);
    }

    /**
     * Remove thumbnail of Category from disk
     * @param string $path
     */
    public function remove($path)
    {
        $exists = Storage::disk($this->disk)->exists($path);

        if($exists){
            Storage::disk($this->disk)->delete($path);
            return TRUE;
        }

        return FALSE;
    }

    public function updateWithUpload($request, $id)
    {
        $homepageSlider = $this->find($id);
        $oldPath = $homepageSlider->thumbnail;
        $this->remove($oldPath);

        $data = $request->all();
        $data['thumbnail'] = $this->upload($request->file('image'));
        $data['updated_by'] = $request->user()->id;

        if($data['link'] == NULL){
            $data['link'] = '#';
        }
        $this->setPresenter('App\Presenters\HomepageSliderPresenter');
        return $this->update($data, $id);
    }
}
