<?php

namespace App\Listeners;

use App\Events\Scoring;
use App\Entities\ScoreLog;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class IncreaseScore
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  Scoring  $event
     * @return void
     */
    public function handle(Scoring $event)
    {
        $entity = new \ReflectionClass(get_class($event->entity));

        $log = ScoreLog::create([
            'user_id'   => $event->user->id,
            'score'     => $event->score,
            'action'    => $event->action,
            'entity'    => $entity->getShortName(),
            'entity_id' => $event->entity->id,
        ]);

        $event->user->increment('score', $event->score);
    }
}
