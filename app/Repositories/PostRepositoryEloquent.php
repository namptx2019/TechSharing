<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\PostRepository;
use App\Entities\Post;
use App\Validators\PostValidator;
use App\Presenters\PostPresenter;

use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use \Cviebrock\EloquentSluggable\Services\SlugService;

/**
 * Class PostRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class PostRepositoryEloquent extends BaseRepository implements PostRepository
{
    protected $fieldSearchable = [
        'name' => 'like',
        'slug'  => 'like',
        'category_id' => '='
    ];

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
        return Post::class;
    }

    /**
     * Specify Validator class name
     *
     * @return mixed
     */
    public function validator()
    {

        return PostValidator::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    private function uploadThumbnail($file, $filename)
    {
        $extension  = $file->extension();
        $filename   = ''.Carbon::now()->timestamp.'_'.$filename.'.'.$extension;

        return Storage::disk($this->disk)->putFileAs('posts', $file, $filename);
    }

    /**
     * Remove thumbnail of Category from disk
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
        $slug = SlugService::createSlug(Post::class, 'slug', $request->name);
        $path = $this->uploadThumbnail($request->file('thumbnail'), $slug);

        //Get data from request
        $data = $request->all();

        //Add neccessary fields
        $data['thumbnail']  = $path;
        $data['viewed']     = 0;
        $data['created_by'] = (int)$author->id;
        $data['updated_by'] = (int)$author->id;

        return Post::create($data);
    }

    /**
     * Override method Repository->update
     * @param Request $request
     * @param integer $id
     * @return Post or Array null
     */
    public function update($request, $id)
    {
        $author = $request->user();
        $post   = $this->find($id);
        $data   = $request->all();

        //If thumbnail is changed

        if($request->file('thumbnail') !== NULL){
            if(isset($data['name'])){
                $slug = SlugService::createSlug(Post::class, 'slug', $request->name);
            }
            else{
                $slug = SlugService::createSlug(Post::class, 'slug', $post->name);
            }

            $data['thumbnail'] = $this->uploadThumbnail($request->file('thumbnail'), $slug);
            $this->removeThumbnailFromDisk($post->thumbnail);
        }

        $data['updated_by'] = (int)$author->id;

        if(isset($data['name'])){
            $post->slug = NULL;
        }

        if($post->update($data)){
            return $post;
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
        $post = Post::find($id);

        //Remove thumbnail from disk
        $this->removeThumbnailFromDisk($post->thumbnail);

        return $post->delete();
    }
}
