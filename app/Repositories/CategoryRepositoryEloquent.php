<?php

namespace App\Repositories;

use App\Repositories\CategoryRepository;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Entities\Category;
use App\Validators\CategoryValidator;

use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use \Cviebrock\EloquentSluggable\Services\SlugService;

/**
 * Class CategoryRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class CategoryRepositoryEloquent extends BaseRepository implements CategoryRepository
{
    private $disk = 'public';

    /**
     * The atttribute allow for searching
     */
    protected $fieldSearchable = [
        'name' => 'like',
        'slug' => 'like',
        'parent_id'
    ];


    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Category::class;
    }

    /**
     * Specify Validator class name
     *
     * @return mixed
     */
    public function validator()
    {

        return CategoryValidator::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    /**
     * Store thumbnail
     * @param File $file
     * @param string $filename
     * @return string path
     */
    private function uploadThumbnail($file, $filename)
    {
        $extension  = $file->extension();
        $filename   = '' . Carbon::now()->timestamp . '_' . $filename . '.' . $extension;

        return Storage::disk($this->disk)->putFileAs('category', $file, $filename);
    }

    /**
     * Remove thumbnail of Category from disk
     * @param string $path
     */
    private function removeThumbnailFromDisk($path)
    {
        $exists = Storage::disk($this->disk)->exists($path);

        if ($exists) {
            Storage::disk($this->disk)->delete($path);
        }

        return FALSE;
    }

    /**
     * Create new category: Upload image, add default field
     */
    public function create($request)
    {
        $author_id  = $request->user()->id;

        //Upload thumbnail
        $slug = SlugService::createSlug(Category::class, 'slug', $request->name);
        $path = $this->uploadThumbnail($request->file('thumbnail'), $slug);

        $data = array(
            'name'      => $request->name,
            'thumbnail' => $path,
            'parent_id' => (isset($request->parent)) ? (int) $request->parent : 0,
            'status'    => 1,
            'header'    => $request->header,
            'created_by' => (int) $author_id,
            'updated_by' => (int) $author_id
        );

        return Category::create($data);
    }

    /**
     * Update category
     * @param Request $request
     * @param integer $id
     * @return Categroy
     */
    public function update($request, $id)
    {
        $category   = $this->skipPresenter(true)->find($id);
        $data       = $request->all();

        if ($request->file('thumbnail') !== NULL) {
            if (isset($data['name'])) {
                $slug = SlugService::createSlug(Category::class, 'slug', $data['name']);
            } else {
                $slug = SlugService::createSlug(Category::class, 'slug', $category->name);
            }

            $data['thumbnail'] = $this->uploadThumbnail($request->file('thumbnail'), $slug);
            $this->removeThumbnailFromDisk($category->thumbnail);
        }

        $data['updated_by'] = $request->user()->id;

        if (isset($data['name'])) {
            $category->slug = NULL;
        }

        if ($category->update($data)) {
            return $category;
        }

        return [];
    }

    /**
     * Get Popular category, sort by number of posts
     *
     * @param int $limit
     * @return Category
     */
    public function popular(int $limit = 0)
    {
        return Category::withCount('hasPosts')->orderBy('has_posts_count', 'desc')->take($limit)->get();
    }

    /**
     * Implements function for retrieve hierarchy categories declare
     *
     * @return array
     */
    public function hierarchy()
    {
        $hierarchy = [];

        $root = $this->skipPresenter()->with('author')->findByField('parent_id', 0);

        foreach ($root as $key => $category) {
            $hierarchy[$key] = $category->toArray();
            $hierarchy[$key]['childrens'] = $this->hierarching($category);
        }

        return $hierarchy;
    }

    /**
     * Get sub category belongs to
     *
     * @param App\Entities\Category $category
     *
     * @return App\Entities\Category
     */
    private function hierarching(Category $category, $isPublish = false)
    {
        $hierarchy = [];
        if ($isPublish) {
            foreach ($category->getPublishChildrens as $key => $child) {
                $hierarchy[$key] = $child->toArray();
                $hierarchy[$key]['childrens'] = $this->hierarching($child, true);
            }
        } else {
            foreach ($category->getChildrens as $key => $child) {
                $hierarchy[$key] = $child->toArray();
                $hierarchy[$key]['childrens'] = $this->hierarching($child);
            }
        }
        return $hierarchy;
    }

    /**
     * only header category (where heder != 0)
     *
     * @return array
     */
    public function headerHierarchy()
    {
        $hierarchy = [];

        $root = $this->skipPresenter()->findWhere([
            'parent_id' => 0,
            'status' => 1,
            ['header', '!=', '0'],
        ]);

        foreach ($root as $key => $category) {
            $hierarchy[$key] = $category->toArray();
            $hierarchy[$key]['childrens'] = $this->hierarching($category, true);
        }

        return $hierarchy;
    }
}
