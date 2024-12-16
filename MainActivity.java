import android.os.Bundle;
import android.widget.Button;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.PurchaseListener;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.PurchaseHistoryResponseListener;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private BillingClient billingClient;
    private static final String SKU_PRO_VERSION = "pro_version_250";  // SKU defined in the Google Play Console

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button purchaseButton = findViewById(R.id.purchase_button);
        purchaseButton.setOnClickListener(v -> initiatePurchaseFlow());

        setupBillingClient();
    }

    private void setupBillingClient() {
        billingClient = BillingClient.newBuilder(this)
            .setListener(new PurchaseListener() {
                @Override
                public void onPurchasesUpdated(BillingResult billingResult, List<Purchase> purchases) {
                    if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                        for (Purchase purchase : purchases) {
                            if (purchase.getSku().equals(SKU_PRO_VERSION)) {
                                unlockProVersion();
                            }
                        }
                    }
                }
            })
            .enablePendingPurchases()
            .build();

        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(BillingResult billingResult) {
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    queryPurchases();
                }
            }

            @Override
            public void onBillingServiceDisconnected() {
                // Handle service disconnect
            }
        });
    }

    private void initiatePurchaseFlow() {
        BillingFlowParams billingFlowParams = BillingFlowParams.newBuilder()
            .setSku(SKU_PRO_VERSION)
            .setType(BillingClient.SkuType.INAPP)
            .build();

        BillingResult billingResult = billingClient.launchBillingFlow(this, billingFlowParams);
    }

    private void queryPurchases() {
        billingClient.queryPurchasesAsync(BillingClient.SkuType.INAPP, (billingResult, purchases) -> {
            if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                for (Purchase purchase : purchases) {
                    if (purchase.getSku().equals(SKU_PRO_VERSION)) {
                        unlockProVersion();
                    }
                }
            }
        });
    }

    private void unlockProVersion() {
        // Unlock the Pro version features here
        Toast.makeText(this, "Pro Version Unlocked!", Toast.LENGTH_SHORT).show();
    }
}
