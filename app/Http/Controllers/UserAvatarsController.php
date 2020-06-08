<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\UserAvatarCreateRequest;
use App\Http\Requests\UserAvatarUpdateRequest;
use App\Repositories\UserAvatarRepository;
use App\Validators\UserAvatarValidator;

/**
 * Class UserAvatarsController.
 *
 * @package namespace App\Http\Controllers;
 */
class UserAvatarsController extends Controller
{
    /**
     * @var UserAvatarRepository
     */
    protected $repository;

    /**
     * @var UserAvatarValidator
     */
    protected $validator;

    /**
     * UserAvatarsController constructor.
     *
     * @param UserAvatarRepository $repository
     * @param UserAvatarValidator $validator
     */
    public function __construct(UserAvatarRepository $repository, UserAvatarValidator $validator)
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
        $userAvatars = $this->repository->all();

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $userAvatars,
            ]);
        }

        return view('userAvatars.index', compact('userAvatars'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  UserAvatarCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function store(UserAvatarCreateRequest $request)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $userAvatar = $this->repository->create($request->all());

            $response = [
                'message' => 'UserAvatar created.',
                'data'    => $userAvatar->toArray(),
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
        $userAvatar = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $userAvatar,
            ]);
        }

        return view('userAvatars.show', compact('userAvatar'));
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
        $userAvatar = $this->repository->find($id);

        return view('userAvatars.edit', compact('userAvatar'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UserAvatarUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function update(UserAvatarUpdateRequest $request, $id)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $userAvatar = $this->repository->update($request->all(), $id);

            $response = [
                'message' => 'UserAvatar updated.',
                'data'    => $userAvatar->toArray(),
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
                'message' => 'UserAvatar deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'UserAvatar deleted.');
    }
}
