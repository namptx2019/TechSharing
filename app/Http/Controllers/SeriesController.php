<?php

namespace App\Http\Controllers;

use App\Presenters\SeriesPresenter;
use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\SeriesCreateRequest;
use App\Http\Requests\SeriesUpdateRequest;
use App\Repositories\SeriesRepository;
use App\Validators\SeriesValidator;
use App\Repositories\PostRepository;
use App\Validators\PostValidator;
use App\Events\Scoring;

/**
 * Class SeriesController.
 *
 * @package namespace App\Http\Controllers;
 */
class SeriesController extends Controller
{
    /**
     * @var SeriesRepository, PostRepository
     */
    protected $repository;
    protected $repositoryPost;

    /**
     * @var SeriesValidator ,PostValidator
     */
    protected $validator;
    protected $validatorPost;

    /**
     * SeriesController constructor.
     *
     * @param SeriesRepository $repository
     * @param SeriesValidator $validator
     */
    public function __construct(SeriesRepository $repository, SeriesValidator $validator, PostRepository $postRepo, PostValidator $postValid)
    {
        $this->repository = $repository;
        $this->validator  = $validator;
        $this->repositoryPost = $postRepo;
        $this->validatorPost = $postValid;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->repository->setPresenter(SeriesPresenter::class);
        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $series = $this->repository->with('category')->with('language')->all();
        if (request()->wantsJson()) {

            return response()->json($series);
        }

        return view('series.index', compact('series'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  SeriesCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function store(SeriesCreateRequest $request)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $series = $this->repository->create($request);

            $response = [
                'message' => 'Series created.',
                'data'    => $series->toArray(),
            ];

            // Emit event to increase score for user
            event(new Scoring($request->user(), config('settings.SCORE_SERIES_CREATE'), 'create', $series));

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
        $series = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $series,
            ]);
        }

        return view('series.show', compact('series'));
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
        $series = $this->repository->find($id);

        return view('series.edit', compact('series'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  SeriesUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function update(SeriesUpdateRequest $request, $id)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $series = $this->repository->update($request, $id);

            $response = [
                'message' => 'Series updated.',
                'data'    => $series->toArray(),
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
                'message' => 'Series deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'Series deleted.');
    }

    /**
     * Get all posts belongs to this series
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function getPosts($id)
    {
        $series = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $series->getAllPosts,
            ]);
        }

        return view('series.show', compact('series'));
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
        $this->repository->setPresenter(SeriesPresenter::class);
        $series = $this->repository->findByField('slug', $slug);

        if (request()->wantsJson()) {
            return response()->json(
                $series
            );
        }

        return view('series.show', compact('series'));
    }

    public function getSeriesAllLanguage()
    {
        $series = $this->repository->with('category')->with('language')->all();

        foreach($series as $seri) {
            $temp = $this->repository->find($seri['id']);
            $seri['author'] = $temp->author;

            $seri['getAllPosts'] = $temp->getAllPosts;
            foreach($seri['getAllPosts'] as $post) {
                $tempPost = $this->repositoryPost->find($post['id']);
                $post['author'] = $tempPost->author;
            }
        }

        if (request()->wantsJson()) {
            return response()->json([
                'data' => $series,
            ]);
        }

        return view('series.index', compact('series'));
    }
}
