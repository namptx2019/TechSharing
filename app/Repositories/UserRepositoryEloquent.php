<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\UserRepository;
use App\Entities\User;
use App\Validators\UserValidator;
use Illuminate\Support\Facades\DB;

use Webpatser\Uuid\Uuid;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * Class UserRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class UserRepositoryEloquent extends BaseRepository implements UserRepository
{
    /**
     * The attributes for searching in criteria
     */
    protected $fieldSearchable = [
        'email' => 'like',
        'username' => 'like',
        'status',
        'phone' => 'like',
        'gender',
        'role_id',
    ];

    /**
     * Define which disk storage
     */
    private $disk = 'public';

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return User::class;
    }

    /**
     * Specify Validator class name
     *
     * @return mixed
     */
    public function validator()
    {

        return UserValidator::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    private function uploadAvatar($file, $filename = '')
    {
        $extension  = $file->extension();
        $filename   = ''.Carbon::now()->timestamp.'_'.$filename.'.'.$extension;

        return Storage::disk($this->disk)->putFileAs('users', $file, $filename);
    }

    /**
     * Remove thumbnail of Category from disk
     * @param string $path
     */
    private function removeAvatar($path)
    {
        $exists = Storage::disk($this->disk)->exists($path);

        if($exists){
            Storage::disk($this->disk)->delete($path);
        }

        return FALSE;
    }

    /**
     * Create user with data has been stored in session (Register Controller)
     * @param Request $request
     * @return User
     */
    public function createWithAvatar($request)
    {
        $data = $request->session()->pull('register')[0];

        $data['password']   = Hash::make($data['password']);
        $data['role_id']    =  $data['role_id'] ?? 3;
        $data['status']     = 1;
        $data['uuid']       = Uuid::generate()->string;
        $data['default_language'] = 'en';
        $data['location']   = 'Asia/Ho_Chi_Minh';

        if($request->hasFile('avatar')){
            $data['avatar'] = $this->uploadAvatar($request->file('avatar'), $data['username']);
        }

        return User::create($data);
    }

    public function create($data)
    {
        $data['password']   = Hash::make($data['password']);
        $data['role_id']    = $data['role_id'] ?? 3;
        $data['status']     = 1;
        $data['uuid']       = Uuid::generate()->string;
        $data['default_language'] = 'en';
        $data['location']   = 'Asia/Ho_Chi_Minh';

        return User::create($data);
    }

    /**
     * Override update method for adding necessary info
     * @param Request $request
     * @param string uuid
     *
     * @return User
     */
    public function update($request, $uuid)
    {
        $user = $this->findByField('uuid', $uuid)->first();
        $data = $request->except(['score', 'email']);

        if(!empty($data['settings'])){
            $data['settings'] = collect($request->settings)->sum();
        }

        if(isset($data['password']) && $data['password'] != NULL){
            $data['password']   = Hash::make($data['password']);
        }
        else{
            unset($data['password']);
        }

        // if($request->hasFile('avatar')){
        //     //removeAvatar($user->avatar);
        //     $filename = isset($data['username']) ? $data['username'] : $user->username;
        //     $data['avatar'] = $this->uploadAvatar($request->file('avatar'), $filename);
        // }

        if($user->update($data)){
            return $user;
        }

        return [];
    }

}
