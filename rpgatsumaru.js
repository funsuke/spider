window.RPGAtsumaru = {
  scoreboards: {
    setRecord: function (recordKey, recordValue) {
      console.log("setRecord");
      return new Promise(function (resolve, reject) {
        // postmessageで親ウィンドウにデータを送信する
        window.parent.postMessage(
          {
            type: "setRecord",
            key: recordKey,
            value: recordValue,
          },
          "*"
        );

        // 親ウィンドウからのメッセージを受信する
        function receiveMessage(event) {
          if (
            event.source === window.parent &&
            event.data.type === "setRecordResponse"
          ) {
            console.log(event.data.message);
            window.removeEventListener("message", receiveMessage);
            resolve();
          }
        }
        window.addEventListener("message", receiveMessage);

        // タイムアウト処理
        setTimeout(function () {
          window.removeEventListener("message", receiveMessage);
          reject(new Error("timeout"));
        }, 5000); // 5秒でタイムアウト
      });
    },
    display: function (recordKey) {
      // postmessageで親ウィンドウにデータを送信する
      window.parent.postMessage(
        {
          type: "display",
          key: recordKey,
        },
        "*"
      );
    },
  },
};
