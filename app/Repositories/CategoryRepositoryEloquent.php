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
    /**
     * The atttribute allow for searching
     */
    protected $fieldSearchable = [
        'name' => 'like',
        'slug' => 'like',
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
     * Create new category: add default field
     */
    public function create($request)
    {
        $author_id  = $request->user()->id;

        $data = array(
            'name'      => $request->name,
            'status'    => 1,
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
}
