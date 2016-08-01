package com.awesomeproject;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;
import android.util.Base64;
import android.util.Log;

import java.util.Random;

import go.spotcontrol.Spotcontrol;

/**
 * Created by shpurcell on 3/17/16.
 */
public class SpotService extends Service {
    private String TAG = "SpotService";
    // Binder given to clients
    private final IBinder mBinder = new LocalBinder();
    // Random number generator
    private final Random mGenerator = new Random();
    public Spotcontrol.SpircController mController;

    /**
     * Class used for the client Binder.  Because we know this service always
     * runs in the same process as its clients, we don't need to deal with IPC.
     */
    public class LocalBinder extends Binder {
        SpotService getService() {
            // Return this instance of LocalService so clients can call public methods
            return SpotService.this;
        }
    }

    public void Login(String username, String password) {
        byte[] key = Base64.decode("Abr6PKmtx6ABxGwigiq/K/3pnj+pt9ZIT2JPuby/Edzz6BMhzvq3xk/A1KHIWsWl2pnf+vY0PyH1L7I7Vw2tRb9/xtPHCmxNxqr6Yo+U+7XuEt+9l2ob7bnIpRgr9dtPmD3zTAgKm4sJP3DzezzVv/Btg2HgdYpU4AH9qoMMMDJIUMzdI7r2LWUXoUk+BDb3vJoEtDYnP+cUl99epsAfJU2Hzgb6sr5NTQwMiSq5JOm79T3xatAS6PVJM+cFBD/sSq5rxW0IzlDHOTr9dUZavChwBjojg2aN+igIl5aKIBcWiKvBbmjxKM3Rdebq6FYSegv6TTNqIEcsUEehKCQmozEsHsr581UX6DM1H7bG1hcF72j70Dq0vhexzmr8v+p2HLbw553/1oxJ3p3I5/mCUTBOYLp4sO3U8Y9WZoKa6zdy", Base64.DEFAULT);
        try {
            mController = Spotcontrol.LoginWithKey(username, password, key, "spotcontrol");
        } catch(Exception e){
            //TODO: handle
        }
    }

    public void LoginBlob(String username, String blob) {
        byte[] key = Base64.decode("Abr6PKmtx6ABxGwigiq/K/3pnj+pt9ZIT2JPuby/Edzz6BMhzvq3xk/A1KHIWsWl2pnf+vY0PyH1L7I7Vw2tRb9/xtPHCmxNxqr6Yo+U+7XuEt+9l2ob7bnIpRgr9dtPmD3zTAgKm4sJP3DzezzVv/Btg2HgdYpU4AH9qoMMMDJIUMzdI7r2LWUXoUk+BDb3vJoEtDYnP+cUl99epsAfJU2Hzgb6sr5NTQwMiSq5JOm79T3xatAS6PVJM+cFBD/sSq5rxW0IzlDHOTr9dUZavChwBjojg2aN+igIl5aKIBcWiKvBbmjxKM3Rdebq6FYSegv6TTNqIEcsUEehKCQmozEsHsr581UX6DM1H7bG1hcF72j70Dq0vhexzmr8v+p2HLbw553/1oxJ3p3I5/mCUTBOYLp4sO3U8Y9WZoKa6zdy", Base64.DEFAULT);
        try{
            mController = Spotcontrol.LoginBlob(username, blob, key, "spotcontrol");
        } catch(Exception e){
            //TODO: handle
        }

    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // We want this service to continue running until it is explicitly
        // stopped, so return sticky
        Log.i(TAG, "onStartCommand");

//        String blob = "SQoxMjQ1NTg0NjAyUAFRFJ8W++sYg4fcZRh7PAQEHi+5qsGmAAAAAAAAAAAAAAAM";
//
//        mController = Spotcontrol.LoginBlob("1245584602", blob, key);
//        //mController = Spotcontrol.LoginWithKey("1245584602", "213125", key);
//        Log.i(TAG, "done with start");
        return START_NOT_STICKY;
    }

    @Override
    public IBinder onBind(Intent intent) {
        return mBinder;
    }

    /** method for clients */
    public int getRandomNumber() {
        return mGenerator.nextInt(100);
    }
}
