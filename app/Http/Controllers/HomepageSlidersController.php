<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\HomepageSliderCreateRequest;
use App\Http\Requests\HomepageSliderUpdateRequest;
use App\Repositories\HomepageSliderRepository;
use App\Validators\HomepageSliderValidator;

/**
 * Class HomepageSlidersController.
 *
 * @package namespace App\Http\Controllers;
 */
class HomepageSlidersController extends Controller
{
    /**
     * @var HomepageSliderRepository
     */
    protected $repository;

    /**
     * @var HomepageSliderValidator
     */
    protected $validator;

    /**
     * HomepageSlidersController constructor.
     *
     * @param HomepageSliderRepository $repository
     * @param HomepageSliderValidator $validator
     */
    public function __construct(HomepageSliderRepository $repository, HomepageSliderValidator $validator)
    {
        $this->repository = $repository;
        $this->validator  = $validator;
    }

    /**
     * Display a listing of the resource. (Homepage Slider with status = 1)
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->repository->setPresenter('App\Presenters\HomepageSliderPresenter');
        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $homepageSliders = $this->repository->orderBy('weight', 'asc')
            ->orderBy('updated_at','desc')
            ->findByField('status', 1);

        if (request()->wantsJson()) {

            return response()->json($homepageSliders);
        }

        return view('homepageSliders.index', compact('homepageSliders'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll()
    {
        $this->repository->setPresenter('App\Presenters\HomepageSliderPresenter');
        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $homepageSliders = $this->repository->orderBy('status','desc')
            ->orderBy('weight', 'asc')
            ->orderBy('updated_at','desc')->all();

        if (request()->wantsJson()) {

            return response()->json($homepageSliders);
        }

        return view('homepageSliders.index', compact('homepageSliders'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  HomepageSliderCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function store(HomepageSliderCreateRequest $request)
    {
        try {
            $this->repository->setPresenter('App\Presenters\HomepageSliderPresenter');
            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $data = $request->all();
            if ($data['link'] == NULL){
                $data['link'] = '#';
            }
            $data['created_by'] = $request->user()->id;
            $data['updated_by'] = $request->user()->id;
            $this->repository->updateWeights($data['weight']);
            $data['thumbnail'] = $this->repository->upload($request->file('image'));

            $homepageSlider = $this->repository->create($data);

            $response = [
                'message' => 'HomepageSlider created.',
                'data'    => $homepageSlider,
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
        $this->repository->setPresenter('App\Presenters\HomepageSliderPresenter');
        $homepageSlider = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json($homepageSlider);
        }

        return view('homepageSliders.show', compact('homepageSlider'));
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
        $homepageSlider = $this->repository->find($id);

        return view('homepageSliders.edit', compact('homepageSlider'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  HomepageSliderUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function update(HomepageSliderUpdateRequest $request, $id)
    {
        try {
            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);
            $this->repository->updateWeights($request->all()['weight'], $id);

            if($request->file('image') !== NULL){
                $homepageSlider = $this->repository->updateWithUpload($request, $id);
            } else {
                $this->repository->setPresenter('App\Presenters\HomepageSliderPresenter');
                $data = $request->all();
                $data['updated_by'] = $request->user()->id;
                $homepageSlider = $this->repository->update($request->all(), $id);
            }

            $response = [
                'message' => 'HomepageSlider updated.',
                'data'    => $homepageSlider,
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
                'message' => 'HomepageSlider deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'HomepageSlider deleted.');
    }
}
