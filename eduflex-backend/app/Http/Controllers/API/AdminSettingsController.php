<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\SchoolSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class AdminSettingsController extends Controller
{
    public function show(Request $request)
    {
        return response()->json($this->settingsForSchool($request->user()->school_id));
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'general' => 'sometimes|array',
            'email' => 'sometimes|array',
            'security' => 'sometimes|array',
            'notifications' => 'sometimes|array',
            'system' => 'sometimes|array',
        ]);

        $schoolId = $request->user()->school_id;
        $current = $this->settingsForSchool($schoolId);

        foreach ($data as $group => $values) {
            SchoolSetting::updateOrCreate(
                ['school_id' => $schoolId, 'group' => $group],
                ['values' => array_replace($current[$group] ?? [], $values)]
            );
        }

        return response()->json([
            'message' => 'Settings saved successfully',
            'settings' => $this->settingsForSchool($schoolId),
        ]);
    }

    public function reset(Request $request)
    {
        SchoolSetting::where('school_id', $request->user()->school_id)->delete();

        return response()->json([
            'message' => 'Settings reset to defaults',
            'settings' => $this->settingsForSchool($request->user()->school_id),
        ]);
    }

    public function clearCache()
    {
        Artisan::call('cache:clear');
        Artisan::call('config:clear');

        return response()->json(['message' => 'System cache cleared successfully']);
    }

    private function settingsForSchool(int $schoolId): array
    {
        $settings = self::defaults();
        SchoolSetting::where('school_id', $schoolId)->get()->each(function ($row) use (&$settings) {
            $settings[$row->group] = array_replace($settings[$row->group] ?? [], $row->values ?? []);
        });

        return $settings;
    }

    public static function defaults(): array
    {
        return [
            'general' => [
                'schoolName' => 'EduFlex School',
                'timezone' => 'Africa/Douala',
                'dateFormat' => 'DD/MM/YYYY',
                'language' => 'en',
            ],
            'email' => [
                'smtpServer' => '',
                'smtpPort' => '587',
                'smtpUsername' => '',
                'smtpPassword' => '',
            ],
            'security' => [
                'twoFactorAuth' => false,
                'sessionTimeout' => '30',
                'maxLoginAttempts' => '5',
                'passwordExpiry' => '90',
            ],
            'notifications' => [
                'emailNotifications' => true,
                'smsNotifications' => false,
                'pushNotifications' => true,
            ],
            'system' => [
                'maintenanceMode' => false,
                'debugMode' => false,
                'autoBackup' => true,
                'backupFrequency' => 'daily',
            ],
        ];
    }
}
