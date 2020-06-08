<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Series;
use stdClass;
use Illuminate\Pagination\Paginator;
/**
 * Class SeriesTransformer.
 *
 * @package namespace App\Transformers;
 */
class SeriesTransformer extends TransformerAbstract
{
    public function getPosts($limit = 0, Series $model)
    {
        $arrPosts = $model->getAllPosts($limit);
        if ($arrPosts == NULL) {
            return [];
        }
        $result = array();
        foreach ($arrPosts as $i => $post) {
            $data = new stdClass();
            $data->name = $post->name;
            $data->slug = $post->slug;
            $data->id   = $post->id;
            $data->desc = $post->desc;
            $data->author = $post->author;
            $data->thumbnail = $post->full_path;
            $data->created_at = $post->created_at;
            $result[$i] = $data;
        }
        return $result;
    }

    /**
     * Transform the Series entity.
     *
     * @param \App\Entities\Series $model
     *
     * @return array
     */
    public function transform(Series $model)
    {
        $author = $model->author;
        $posts = (\Route::current()->getName() == 'pubApi.series.popular') ? $this->getPosts(3, $model) : $this->getPosts(null, $model);
        return [
            'id'            => (int) $model->id,
            'name'          => $model->name,
            'text'          => $model->name,
            'description'   => $model->desc,
            'poster'        => asset('storage/uploads/'.$model->poster),
            'category'      => $model->category,
            'content'       => $model->content,
            'slug'          => $model->slug,
            'viewed'        => $model->viewed,
            'author'        => $model->author,
            'posts'         => $posts,
            'status'        => $model->status,
            'created_at'    => $model->created_at,
            'updated_at'    => $model->updated_at,

            //poster full path
            'full_path'     => $model->full_path,
        ];
    }
}
