package com.awesomeproject;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.util.Log;

import com.awesomeproject.SpotService.LocalBinder;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import go.spotcontrol.Spotcontrol;

/**
 * Created by shpurcell on 3/17/16.
 */
public class SpotModule extends ReactContextBaseJavaModule {
    boolean mBound;
    Spotcontrol.SpircController mController;
    private String TAG = "SPOT_MODULE";
    private ServiceConnection mConnection = new ServiceConnection() {
        // Called when the connection with the service is established
        public void onServiceConnected(ComponentName className, IBinder service) {
            // Because we have bound to an explicit
            // service that is running in our own process, we can
            // cast its IBinder to a concrete class and directly access it.
            LocalBinder binder = (LocalBinder) service;
            mController = binder.getService();
            mBound = true;
        }

        // Called when the connection with the service disconnects unexpectedly
        public void onServiceDisconnected(ComponentName className) {
            Log.e(TAG, "onServiceDisconnected");
            mBound = false;
        }
    };

    public SpotModule(ReactApplicationContext reactContext) {
        super(reactContext);

        //start the service
        //login?
        Log.i(TAG, "Spot module");
        Intent intent = new Intent(reactContext, SpotService.class);
        reactContext.startService(intent);
        reactContext.bindService(intent, mConnection, Context.BIND_AUTO_CREATE);
    }


    @ReactMethod
    public void loadTracks(String ident, String tracks) {
        mController.LoadTrackIds(ident, tracks);
    }


    @ReactMethod
    public void play(String ident) {
        Log.i(TAG, "Spot play");
        mController.SendPlay(ident);
    }

    @ReactMethod
    public void pause(String ident) {
        Log.i(TAG, "Spot pause");
        mController.SendPause(ident);
    }


    @Override
    public String getName() {
        return "SpotAndroid";
    }
}
