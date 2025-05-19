<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $response_id
 * @property int $question_id
 * @property string $value
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\AnswersFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Answers newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Answers newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Answers query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Answers whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Answers whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Answers whereQuestionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Answers whereResponseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Answers whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Answers whereValue($value)
 */
	class Answers extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Question> $questions
 * @property-read int|null $questions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Responses> $responses
 * @property-read int|null $responses_count
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\FormsFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Forms newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Forms newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Forms query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Forms whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Forms whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Forms whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Forms whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Forms whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Forms whereUserId($value)
 */
	class Forms extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $form_id
 * @property string $type
 * @property string $question_text
 * @property int $is_required
 * @property string|null $options
 * @property int $order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\QuestionFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Question newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Question newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Question query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Question whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Question whereFormId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Question whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Question whereIsRequired($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Question whereOptions($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Question whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Question whereQuestionText($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Question whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Question whereUpdatedAt($value)
 */
	class Question extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $form_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\ResponsesFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Responses newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Responses newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Responses query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Responses whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Responses whereFormId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Responses whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Responses whereUpdatedAt($value)
 */
	class Responses extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property string|null $created_at
 * @property string|null $updated_at
 * @property-read \App\Models\Forms|null $forms
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

