<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\UserAvatarRepository;
use App\Entities\UserAvatar;
use App\Validators\UserAvatarValidator;

use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * Class UserAvatarRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class UserAvatarRepositoryEloquent extends BaseRepository implements UserAvatarRepository
{
    private $disk = 'public';
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return UserAvatar::class;
    }

    /**
     * Specify Validator class name
     *
     * @return mixed
     */
    public function validator()
    {

        return UserAvatarValidator::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function deactive($user_id)
    {
        $old_ava = $this->findWhere([
            'user_id' => $user_id,
            'status' => 1
        ]);
        if(empty($old_ava)){
            return true;
        }
        foreach ($old_ava as $key => $value) {
            if (!$value->update(['status' => 0])) {
                return false;
            }
        }
        return true;
    }

    private function uploadImage($file, $filename = '')
    {
        $extension  = $file->extension();
        $filename   = '' . Carbon::now()->timestamp . '_' . $filename . '.' . $extension;

        return Storage::disk($this->disk)->putFileAs('users', $file, $filename);
    }

    public function uploadAvatar($request, $user_id, $user_name)
    {
        if (!$this->deactive($user_id)) {
            return false;
        }
        $data = $request->all();
        if ($request->hasFile('avatar')) {
            $filename = isset($data['username']) ? $data['username'] : $user_name;
            $user_avatar['link'] = $this->uploadImage($request->file('avatar'), $filename);
        }
        $user_avatar['user_id'] = $user_id;
        $user_avatar['status'] = 1;
        if ($user_avatar = $this->create($user_avatar)) {
            return $user_avatar;
        } else {
            return false;
        }
    }
}
