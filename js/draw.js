/** draw2d キャンバス */
let canvas = null;

$(function () {
  canvas = new draw2d.Canvas("main-canvas");

  //ドラッグ&ドロップで connectionを作成できるようにする
  canvas.installEditPolicy(
    new draw2d.policy.connection.DragConnectionCreatePolicy({
      createConnection: connectionSetting
    })
  );

  $('#btn-undo').on('click', clickUndo);
  $('#btn-redo').on('click', clickRedo);
  $('#btn-delete').on('click', clickDelete);
  $('#btn-add-label').on('click', clickAddLabel);
});

/** connectionの形状の設定 */
let connectionSetting = function () {
  return new draw2d.Connection({
    router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter()
  })
};

/** draw2d の redo処理 */
let clickRedo = function () {
  canvas.getCommandStack().redo();
};

/** draw2d の undo 処理 */
let clickUndo = function () {
  canvas.getCommandStack().undo();
};

/** 選択要素の削除 */
let clickDelete = function () {
  let deleteCommand = new draw2d.command.CommandDelete(canvas.getPrimarySelection());
  canvas.getCommandStack().execute(deleteCommand);
};

/** ラベルの追加 */
let clickAddLabel = function () {
  let label = new draw2d.shape.basic.Label({
    text: "テキスト",
    padding: 20,
  });

  label.createPort("input"); // input ポートを追加
  label.createPort("output"); // output ポートの追加
  label.setFontSize(40);

  let addCommand = new draw2d.command.CommandAdd(canvas, label, 100, 100);
  canvas.getCommandStack().execute(addCommand);
};
