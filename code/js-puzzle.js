window.onload = function()
{
  GameState = 0;

  $("#Restart").click(
    function()
    {
      Restart();
    }
  )
  $(".picture").click(
    function(input){
      Onclick(input.target);
    }
  )
}

function Restart()
{
  while(1)
  {
    GameState = 1;
    var p = document.getElementsByClassName("picture");
    var temp = []; //数组是 "a = []", 而不是 "a = {}"
    for(var i = 0; i < 16; i++)
      for(var j = 0; j < 16; j++)
      {
        var random = Math.ceil(Math.random() * 2);
        if(random == 2) {
          var t = p[i].id;
          p[i].id = p[j].id;
          p[j].id = t;
        }
      }
    /*or(var i = 0; i < 16; i++)
    {
      var num = -1;
      while(num < 1 || num > 16)
      {
        num = Math.ceil(Math.random()*16);
        for(var j = 0; j < temp.length; j++)
          if(temp[j] == num) num = -1;
      }
      p[i].id = ("p" + num);
      temp[i] = num;
    }*/

    //检查拼图有解性
    //Make sure the PuzzleGame have a solution
    {
    var con1 = 0, con2 = 0;
    Pb = [0];
    var num = 0;
    for(var i = 0; i < 16; i++)
    {
        Pb[i] = p[i].id.slice(1);
        if(p[i].id == "p16") num = i + 1;
    }

    for(var i = 0; i < Pb.length; i++)
      for(var j = i + 1; j < Pb.length; j++)
        if(Number(Pb[i]) > Number(Pb[j])) con2++;
    var col = num % 4;
    var row = Math.ceil(num/4);
    if(col == 0) col = 4;
    con2 = (con2 + col + row) % 2;
    //alert("con2: " + con2 + "\ncol: " + col + "\n" + "row: " + row + "\n" + "num: " + num);
    if(con1 != con2) continue;
  }
    return;
  }
}

function Onclick(target)
{
  if(GameState == 0) return;
  var pos = target.className.split(/\ /)[1];
  var pos_num = Number(pos);
  var tar = -1;
  if((pos_num - 4 > 0) && $("." + (pos_num - 4))[0].id == "p16")
    { tar = pos_num - 4; }
  else if((pos_num + 1 <= 16 && pos_num % 4 > 0) && $("." + (pos_num + 1))[0].id == "p16")
    { tar = pos_num + 1;}
  else if((pos_num - 1 > 0 && (pos_num - 1) % 4 > 0) && $("." + (pos_num - 1))[0].id == "p16")
    { tar = pos_num - 1;}
  else if((pos_num + 4 <= 16) && $("." + (pos_num + 4))[0].id == "p16")
    { tar = pos_num + 4; }
  if(tar == -1) return;
  $("#p16").attr('id', target.id);
  target.id = "p16";
  Cherk();
}

function Cherk()
{
  if(GameState == 0) return;
  var p = $(".picture");
  for(var i = 0; i < 16; i ++)
  {
    var cls = "p" + p[i].className.split(/\ /)[1];
    if(cls != p[i].id) return;
  }
  setTimeout(function(){alert("Win");}, 1);
  GameState = 0;
}
