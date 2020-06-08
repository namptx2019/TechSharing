<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Repositories\UserRepository;
use App\Validators\UserValidator;
use App\Entities\User;
use App\Repositories\UserAvatarRepository;
use stdClass;

/**
 * Class UsersController.
 *
 * @package namespace App\Http\Controllers;
 */
class
UsersController extends Controller
{
    /**
     * @var UserRepository
     */
    protected $repository;

    protected $userAvatarRepository;

    /**
     * @var UserValidator
     */
    protected $validator;

    /**
     * UsersController constructor.
     *
     * @param UserRepository $repository
     * @param UserValidator $validator
     */
    public function __construct(UserRepository $repository, UserValidator $validator, UserAvatarRepository $userAvatarRepository)
    {
        $this->repository = $repository;
        $this->validator  = $validator;
        $this->userAvatarRepository = $userAvatarRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $this->repository->setPresenter("App\\Presenters\\UserPresenter");
        $users = $this->repository->all();

        if (request()->wantsJson()) {

            return response()->json($users);
        }

        return view('users.index', compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  UserCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function store(UserCreateRequest $request)
    {
        try {
            $data = $request->all();

            $this->validator->with($data)->passesOrFail(ValidatorInterface::RULE_CREATE);

            $user = $this->repository->create($request->all());

            if ($request->hasFile('avatar')) {
                $upload_avatar = $this->userAvatarRepository->uploadAvatar($request, $user->id, $user->username);
                $user->avatars[0] = $upload_avatar;
                if (!$upload_avatar) {
                    return response()->json([
                        'error'   => true,
                        'message' => [
                            0 => 'Upload avatar failed!'
                        ],
                    ]);
                }
            }

            $response = [
                'message' => 'User created.',
                'data'    => $user->toArray(),
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
    public function show($uuid)
    {
        $user = $this->repository->with('avatars')->findByField('uuid', $uuid)->first();
        $user->rank = $user->rank();
        foreach ($user->scoreLogs as $value) {
            if ($value->entityInstance) {
                $value->entityInstance->test;
                $value->entityInstance->post;
            }
        }

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $user,
            ]);
        }

        if (!isset($user->uuid)) {
            abort(404);
        }

        return view('homepage.pages.profile', compact('user'));
    }

    /**
     * Display the current user is being logged in.
     *
     * @return \Illuminate\Http\Response
     */
    public function me()
    {
        $user = request()->user()->load('avatars');
        foreach ($user->scoreLogs as $value) {
            if ($value->entityInstance) {
                $value->entityInstance->test;
                $value->entityInstance->post;
            }
        }


        if (request()->wantsJson()) {

            return response()->json([
                'data' => $user,
            ]);
        }

        if(!isset($user->uuid)){
            abort(404);
        }

        return view('homepage.pages.profile', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($uuid)
    {
        $user = $this->repository->findByField('uuid', $uuid)->first();
        $languages = Lang::all();
        $locations = TimeZone::all();

        return view('homepage.pages.profile_edit', compact('user', 'languages', 'locations'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UserUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function update(UserUpdateRequest $request, $uuid)
    {
        try {
            $user = $this->repository->findByField('uuid', $uuid)->first();

            if (!isset($user)) {
                return redirect()->back();
            }
            $this->validator->with($request->all())->setId($user->id)->passesOrFail(ValidatorInterface::RULE_UPDATE);

            if ($request->hasFile('avatar')) {
                $upload_avatar = $this->userAvatarRepository->uploadAvatar($request, $user->id, $user->username);
                if (!$upload_avatar) {
                    return response()->json([
                        'error'   => true,
                        'message' => [
                            0 => 'Upload avatar failed!'
                        ],
                    ]);
                }
            }

            $user = $this->repository->with('avatars')->update($request, $uuid);

            $response = [
                'message' => 'Profile updated.',
                'data'    => $user->toArray(),
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
    public function destroy($uuid)
    {
        $user       = $this->repository->findByField('uuid', $uuid)->first();
        $deleted    = $user->delete();

        if (request()->wantsJson()) {

            return response()->json([
                'message' => 'User deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'User deleted.');
    }

    /**
     * Create user with avatar
     */
    public function storeWithAvatar(UserCreateRequest $request)
    {
        try {
            $data = $request->all();

            $this->validator->with($data)->passesOrFail(ValidatorInterface::RULE_CREATE);

            $user = $this->repository->createWithAvatar($request);

            $response = [
                'message' => 'User created.',
                'data'    => $user->toArray(),
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
     * Display a listing of the users (having condition).
     *
     * @param  offset
     *
     * @return Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function search($offset)
    {
        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $this->repository->setPresenter("App\\Presenters\\UserPresenter");
        $users = $this->repository->paginate($offset);

        if (request()->wantsJson()) {

            return response()->json($users);
        }

        return view('users.index', compact('users'));
    }

    public function deleteAvatar($uuid)
    {
        $user = $this->repository->with('avatars')->findByField('uuid', $uuid)->first();
        if (isset($user->avatars[0])) {
            $avatar = $this->userAvatarRepository->deactive($user->id);
        } else {
            return response()->json([
                'error'   => true,
                'message' => ''
            ]);
        }
        if (request()->wantsJson()) {

            return response()->json([
                'message' => 'Avatar deleted.',
                'deleted' => $avatar,
            ]);
        }
    }

    /**
     * Response user by uuid with user's settings.
     *
     * @param String $uuid
     *
     * @return Response
     */
    public function getUserByUuid($uuid)
    {
        $user = $this->repository->findByField('uuid', $uuid)->first();

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $user,
            ]);
        }

        if (!isset($user->uuid)) {
            abort(404);
        }

        return view('homepage.pages.profile', compact('user'));
    }

    /**
     * Get top of leaderboard
     */
    public function leaderboard()
    {
        $users = $this->repository->scopeQuery(function ($query) {
            return $query->orderBy('score', 'desc')->take(5);
        })->with('avatars')->all(['username', 'score', 'uuid', 'id']);
        foreach ($users as $user) {
            $user->rank = $user->rank();
        }

        if (request()->wantsJson()) {

            return response()->json($users);
        }

        return abort(403);
    }
}
