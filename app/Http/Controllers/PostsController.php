<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\PostCreateRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Repositories\PostRepository;
use App\Validators\PostValidator;
use App\Presenters\PostPresenter;
use App\Events\Scoring;

/**
 * Class PostsController.
 *
 * @package namespace App\Http\Controllers;
 */
class PostsController extends Controller
{
    /**
     * @var PostRepository
     */
    protected $repository;
    protected $Userrepository;
    /**
     * @var PostValidator
     */
    protected $validator;

    /**
     * PostsController constructor.
     *
     * @param PostRepository $repository
     * @param PostValidator $validator
     */
    public function __construct(PostRepository $repository, PostValidator $validator, UserRepository $Userrepository)
    {
        $this->repository = $repository;
        $this->validator  = $validator;
        $this->repositoryUser = $Userrepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->repository->setPresenter(PostPresenter::class);
        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $posts = $this->repository;
        if (request()->input('filter') != null) {
            $posts = $posts->with(['categoryName'])->skipPresenter();
        }
        $posts = $posts->scopeQuery(function($query){
            return $query->orderBy('id','desc');
        })->all();

        if (request()->wantsJson()) {
            if (!empty($posts['data'])) {
                return response()->json($posts);
            } else {
                return response()->json(['data' => $posts]);
            }
        }

        return response()->json($posts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  PostCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function store(PostCreateRequest $request)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $post = $this->repository->create($request);

            $response = [
                'message' => 'Post created.',
                'data'    => $post->toArray(),
            ];

            // Emit event to increase score for user
            event(new Scoring($request->user(), config('settings.SCORE_POST_CREATE'), 'create', $post));

            if ($request->wantsJson()) {

                return response()->json($response);
            }

            return redirect()->back()->with('message', $response['message']);
        } catch (ValidatorException $e) {
            if ($request->wantsJson()) {
                return response()->json([
                    'error'   => true,
                    'message' => $e->getMessageBag()
                ]);
            }

            return redirect()->back()->withErrors($e->getMessageBag())->withInput();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->repository->setPresenter(PostPresenter::class);
        $post = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json($post);
        }

        return view('posts.show', compact('post'));
    }

    /**
     * Display the specified resource.
     *
     * @param  string $slug
     *
     * @return \Illuminate\Http\Response
     */
    public function getDetailsSlug($slug)
    {
        $this->repository->setPresenter(PostPresenter::class);
        $post = $this->repository->findByField('slug', $slug);

        if (request()->wantsJson()) {
            return response()->json(
                $post
            );
        }

        return view('posts.show', compact('post'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $post = $this->repository->find($id);

        return view('posts.edit', compact('post'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  PostUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function update(PostUpdateRequest $request, $id)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $post = $this->repository->update($request, $id);

            $response = [
                'message' => 'Post updated.',
                'data'    => $post->toArray(),
            ];

            if ($request->wantsJson()) {

                return response()->json($response);
            }

            return redirect()->back()->with('message', $response['message']);
        } catch (ValidatorException $e) {

            if ($request->wantsJson()) {

                return response()->json([
                    'error'   => true,
                    'message' => $e->getMessageBag()
                ]);
            }

            return redirect()->back()->withErrors($e->getMessageBag())->withInput();
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deleted = $this->repository->delete($id);

        if (request()->wantsJson()) {

            return response()->json([
                'message' => 'Post deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'Post deleted.');
    }

    /**
     * Get all series has been belongs to
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function getSeries($id)
    {
        $post = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $post->series,
            ]);
        }

        return view('series.show', compact('series'));
    }

    /**
     * Display a listing of the resource with pagination for public api
     *
     * @return \Illuminate\Http\Response
     */
    public function paginate()
    {
        // Using transfomer for entities
        $this->repository->setPresenter(PostPresenter::class);

        // Set Criteria
        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));

        $posts = $this->repository->scopeQuery(function($query){
            return $query->orderBy('id','desc');
        })->paginate(12);

        if (request()->wantsJson()) {

            return response()->json($posts);
        }
    }
}
