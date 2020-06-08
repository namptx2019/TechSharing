<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\SeriesPostRelationCreateRequest;
use App\Http\Requests\SeriesPostRelationUpdateRequest;
use App\Repositories\SeriesPostRelationRepository;

use App\Entities\Series;

/**
 * Class SeriesPostRelationsController.
 *
 * @package namespace App\Http\Controllers;
 */
class SeriesPostRelationsController extends Controller
{
    /**
     * @var SeriesPostRelationRepository
     */
    protected $repository;

    protected $series;

    /**
     * SeriesPostRelationsController constructor.
     *
     * @param SeriesPostRelationRepository $repository
     * @param SeriesPostRelationValidator $validator
     */
    public function __construct(SeriesPostRelationRepository $repository)
    {
        $this->repository   = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $seriesPostRelations = $this->repository->all();

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $seriesPostRelations,
            ]);
        }

        return view('seriesPostRelations.index', compact('seriesPostRelations'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  SeriesPostRelationCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function store(SeriesPostRelationCreateRequest $request)
    {
        try {
            $seriesPostRelation = $this->repository->create($request->all());
            $series = new Series;
            $series = $series->find($request->series_id);
            $series->update([
                'updated_by' => $request->user()->id
            ]);

            $response = [
                'message' => 'SeriesPostRelation created.',
                'data'    => $seriesPostRelation->toArray(),
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
     * Display the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $seriesPostRelation = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $seriesPostRelation,
            ]);
        }

        return view('seriesPostRelations.show', compact('seriesPostRelation'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(SeriesPostRelationUpdateRequest $request)
    {
        $deleted = $this->repository->deletewhere(
            [
                'series_id' => $request->series_id,
                'post_id'   => $request->post_id
            ]
        );

        if($deleted !== FALSE){
            $series = new Series;
            $series = $series->find($request->series_id);
            $series->update([
                'updated_by' => $request->user()->id
            ]);
        }

        if (request()->wantsJson()) {

            return response()->json([
                'message' => 'SeriesPostRelation deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'SeriesPostRelation deleted.');
    }
}
