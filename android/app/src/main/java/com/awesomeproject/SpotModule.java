package com.awesomeproject;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.net.wifi.WifiManager;
import android.net.wifi.WifiManager.MulticastLock;
import android.os.IBinder;
import android.util.Log;

import com.awesomeproject.SpotService.LocalBinder;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import go.spotcontrol.Spotcontrol;

/**
 * Created by shpurcell on 3/17/16.
 */
public class SpotModule extends ReactContextBaseJavaModule {
    boolean mBound;
    SpotService mService;
    private String TAG = "SPOT_MODULE";
    final ReactApplicationContext reactContext;

    private ServiceConnection mConnection = new ServiceConnection() {
        // Called when the connection with the service is established
        public void onServiceConnected(ComponentName className, IBinder service) {
            // Because we have bound to an explicit
            // service that is running in our own process, we can
            // cast its IBinder to a concrete class and directly access it.
            LocalBinder binder = (LocalBinder) service;
            mService = binder.getService();
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
        this.reactContext = reactContext;
    }

    private boolean checkController(Promise promise) {
        if (mService == null || mService.mController == null) {
            promise.reject("500", "Not logged in");
            return false;
        }
        return true;
    }

    @ReactMethod
    public void login(final String username,final String password, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                mService.Login(username, password);
                promise.resolve("true");
                SpotModule.this.getUpdates();
            }
        }).start();
    }

    @ReactMethod
    public void loginBlob(final String username,final  String blob, final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                mService.LoginBlob(username, blob);
                promise.resolve("true");
                SpotModule.this.getUpdates();
            }

        }).start();
    }


    @ReactMethod
    public void listDevices(Promise promise){
        if (!checkController(promise)){
            return;
        }

        try {
            promise.resolve(mService.mController.ListDevicesJson());
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void listMdnsDevices(Promise promise){
        if (!checkController(promise)){
            return;
        }
        try {
            promise.resolve(mService.mController.ListMdnsDevicesJson());
        } catch (Exception e) {
            promise.reject(e);
        }
    }


    private void getUpdates(){
        mService.mController.HandleUpdates(new Spotcontrol.Updater.Stub() {
            public void OnUpdate(String s) {
                reactContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("SpotDeviceNotify", s);
            }
        });
    }

    @ReactMethod
    public void loadTracks(String ident, String tracks, Promise promise) {
        if (!checkController(promise)){
            return;
        }
        mService.mController.LoadTrackIds(ident, tracks);
        promise.resolve("true");
    }

    @ReactMethod
    public void startDiscovery(Promise promise) {
        final Promise promise1 = promise;

        new Thread(new Runnable() {
            public void run() {
                WifiManager wifi = (WifiManager) reactContext.getSystemService(Context.WIFI_SERVICE);
                MulticastLock multicastLock = wifi.createMulticastLock("multicastLock");
                multicastLock.setReferenceCounted(true);
                multicastLock.acquire();

                Spotcontrol.BlobInfo b = Spotcontrol.BlobFromDiscovery();
                WritableMap map = Arguments.createMap();
                map.putString("username", b.getUsername());
                map.putString("blob", b.getDecodedBlob());
                promise1.resolve(map);

                if (multicastLock != null) {
                    multicastLock.release();
                }
            }
        }).start();
    }

    @ReactMethod
    public void play(String ident, Promise promise) {
        if (!checkController(promise)){
            return;
        }
        Log.i(TAG, "Spot play");
        mService.mController.SendPlay(ident);
        promise.resolve("true");
    }

    @ReactMethod
    public void hello(Promise promise) {
        if (!checkController(promise)){
            return;
        }
        Log.i(TAG, "Spot play");
        mService.mController.SendHello();
        promise.resolve("true");
    }


    @ReactMethod
    public void pause(String ident, Promise promise) {
        if (!checkController(promise)){
            return;
        }
        Log.i(TAG, "Spot pause");
        mService.mController.SendPause(ident);
        promise.resolve("true");
    }

    @ReactMethod
    public  void connectToDevice(String url, Promise promise) {
        if (!checkController(promise)){
            return;
        }
        mService.mController.ConnectToDevice(url);
        promise.resolve("true");
    }


    @Override
    public String getName() {
        return "SpotAndroid";
    }
}
