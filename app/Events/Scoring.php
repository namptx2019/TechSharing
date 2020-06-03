<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\Entities\User;

class Scoring
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;

    public $score;

    public $action;

    public $entity;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(
        User $user,
        int $score = 0,
        string $action,
        $entity // any
    )
    {
        $this->user = $user;
        $this->score = $score;
        $this->action = $action;
        $this->entity = $entity;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
