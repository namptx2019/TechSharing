<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\ScoreLogCreateRequest;
use App\Http\Requests\ScoreLogUpdateRequest;
use App\Repositories\ScoreLogRepository;
use App\Validators\ScoreLogValidator;

/**
 * Class ScoreLogsController.
 *
 * @package namespace App\Http\Controllers;
 */
class ScoreLogsController extends Controller
{
    /**
     * @var ScoreLogRepository
     */
    protected $repository;

    /**
     * @var ScoreLogValidator
     */
    protected $validator;

    /**
     * ScoreLogsController constructor.
     *
     * @param ScoreLogRepository $repository
     * @param ScoreLogValidator $validator
     */
    public function __construct(ScoreLogRepository $repository, ScoreLogValidator $validator)
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
        $scoreLogs = $this->repository->all();

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $scoreLogs,
            ]);
        }

        return view('scoreLogs.index', compact('scoreLogs'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ScoreLogCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function store(ScoreLogCreateRequest $request)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $scoreLog = $this->repository->create($request->all());

            $response = [
                'message' => 'ScoreLog created.',
                'data'    => $scoreLog->toArray(),
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
        $scoreLog = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $scoreLog,
            ]);
        }

        return view('scoreLogs.show', compact('scoreLog'));
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
        $scoreLog = $this->repository->find($id);

        return view('scoreLogs.edit', compact('scoreLog'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  ScoreLogUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function update(ScoreLogUpdateRequest $request, $id)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $scoreLog = $this->repository->update($request->all(), $id);

            $response = [
                'message' => 'ScoreLog updated.',
                'data'    => $scoreLog->toArray(),
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
                'message' => 'ScoreLog deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'ScoreLog deleted.');
    }
}
