<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\SeriesCreateRequest;
use App\Http\Requests\SeriesUpdateRequest;
use App\Repositories\SeriesRepository;
use App\Validators\SeriesValidator;

/**
 * Class SeriesController.
 *
 * @package namespace App\Http\Controllers;
 */
class SeriesController extends Controller
{
    /**
     * @var SeriesRepository
     */
    protected $repository;

    /**
     * @var SeriesValidator
     */
    protected $validator;

    /**
     * SeriesController constructor.
     *
     * @param SeriesRepository $repository
     * @param SeriesValidator $validator
     */
    public function __construct(SeriesRepository $repository, SeriesValidator $validator)
    {
        $this->repository = $repository;
        $this->validator  = $validator;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $series = $this->repository->all();

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $series,
            ]);
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

            $series = $this->repository->create($request->all());

            $response = [
                'message' => 'Series created.',
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

            $series = $this->repository->update($request->all(), $id);

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
}
