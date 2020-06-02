<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\RankCreateRequest;
use App\Http\Requests\RankUpdateRequest;
use App\Repositories\RankRepository;
use App\Validators\RankValidator;
/**
 * Class RanksController.
 *
 * @package namespace App\Http\Controllers;
 */
class RanksController extends Controller
{
    /**
     * @var RankRepository
     */
    protected $repository;

    /**
     * @var RankValidator
     */
    protected $validator;

    /**
     * RanksController constructor.
     *
     * @param RankRepository $repository
     * @param RankValidator $validator
     */
    public function __construct(RankRepository $repository, RankValidator $validator)
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

        $ranks = $this->repository->orderBy('min_score', 'asc')->all();

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $ranks,
            ]);
        }

        return view('ranks.index', compact('ranks'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  RankCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function store(RankCreateRequest $request)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $rank = $this->repository->create($request);

            $response = [
                'message' => 'Rank created.',
                'data'    => $rank->toArray(),
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
        $rank = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $rank,
            ]);
        }

        return view('ranks.show', compact('rank'));
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
        $rank = $this->repository->find($id);

        return view('ranks.edit', compact('rank'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  RankUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function update(RankUpdateRequest $request, $id)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $rank = $this->repository->update($request, $id);

            $response = [
                'message' => 'Contest updated.',
                'data'    => $rank->toArray(),
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
                'message' => 'Rank deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'Contest deleted.');
    }

}
