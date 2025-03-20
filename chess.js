let x = ["A", "B", "C", "D", "E", "F", "G", "H"];
let y = [1, 2, 3, 4, 5, 6, 7, 8];

class Piece {
  constructor(color, name, spec) {
    this.name = name;
    this.color = color;
    this.spec = spec;
  }

  static blackKingPossibleMoves(arr) {
    let pieces = [
      queenWhite,
      kingWhite,
      knight1White,
      rook1White,
      bishop1White,
      knight2White,
      rook2White,
      bishop2White,
      pawn11,
      pawn12,
      pawn13,
      pawn14,
      pawn15,
      pawn16,
      pawn10,
      pawn9,
    ];

    let ya = [1, 2, 3, 4, 5, 6, 7, 8];
    let xa = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let kb = localStorage.getItem("kingBlack");
    let xAxb = kb.substring(kb.length - 4, kb.length - 3);
    let yAxb = parseInt(kb.substring(kb.length - 2, kb.length - 1));
    let ioxf = xa.indexOf(xAxb); //for white king
    let ioyf = ya.indexOf(yAxb);

    let newArr = [];
    let km = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length > 2) {
        let g = arr[i];

        if (g[2].color == "white") {
          km.push(g[2]);
        }
      }
    }

    for (let j = 0; j < km.length; j++) {
      for (let i = 0; i < pieces.length; i++) {
        if (km[j].spec == pieces[i].spec) {
          newArr.push(pieces[i]);
        }
      }
    }

    let whiteKingPmoves = [];
    let onlyWhite = [];

    for (let h = 0; h < arr.length; h++) {
      if (
        ((arr[h].slice(0, 1).toString() == xa[ioxf] ||
          arr[h].slice(0, 1).toString() == xa[ioxf + 1] ||
          arr[h].slice(0, 1).toString() == xa[ioxf - 1]) &&
          (parseInt(arr[h].slice(1, 2)) == ya[ioyf + 1] ||
            parseInt(arr[h].slice(1, 2)) == ya[ioyf - 1])) ||
        ((parseInt(arr[h].slice(1, 2)) == ya[ioyf] ||
          parseInt(arr[h].slice(1, 2)) == ya[ioyf + 1] ||
          parseInt(arr[h].slice(1, 2)) == ya[ioyf - 1]) &&
          (arr[h].slice(0, 1).toString() == xa[ioxf + 1] ||
            arr[h].slice(0, 1).toString() == xa[ioxf - 1])) ||
        (arr[h].slice(1, 2).toString() == ya[ioyf] &&
          (arr[h].slice(0, 1).toString() == xa[ioxf - 1] ||
            arr[h].slice(0, 1).toString() == xa[ioxf + 1])) ||
        (arr[h].slice(0, 1).toString() == xa[ioxf] &&
          (parseInt(arr[h].slice(1, 2)) == ya[ioyf - 1] ||
            parseInt(arr[h].slice(1, 2)) == ya[ioyf + 1]))
      ) {
        let o = arr[h];
        if (arr[h].length < 3) {
          whiteKingPmoves.push(arr[h]);
        } else if (o[2].color == "white") {
          onlyWhite.push(arr[h]);
        }
      }
    }

    let testf = [];
    if (whiteKingPmoves.length > 0) {
      for (let i = 0; i < newArr.length; i++) {
        for (let j = 0; j < whiteKingPmoves.length; j++) {
          if (newArr[i].name == "king") {
            continue;
          } else if (
            newArr[i].name == "pawn" &&
            newArr[i].pawnMove(
              whiteKingPmoves[j].slice(0, 1).toString(),
              parseInt(whiteKingPmoves[j].slice(1, 2))
            )
          ) {
            testf.push(whiteKingPmoves[j]);
          } else if (
            newArr[i].name == "knight" &&
            newArr[i].knightMove(
              whiteKingPmoves[j].slice(0, 1).toString(),
              parseInt(whiteKingPmoves[j].slice(1, 2))
            )
          ) {
            testf.push(whiteKingPmoves[j]);
          } else if (
            newArr[i].name == "bishop" &&
            newArr[i].bishopMove(
              arr,
              whiteKingPmoves[j].slice(0, 1).toString(),
              parseInt(whiteKingPmoves[j].slice(1, 2))
            )
          ) {
            testf.push(whiteKingPmoves[j]);
          } else if (
            newArr[i].name == "rook" &&
            newArr[i].rookMove(
              arr,
              whiteKingPmoves[j].slice(0, 1).toString(),
              parseInt(whiteKingPmoves[j].slice(1, 2))
            )
          ) {
            testf.push(whiteKingPmoves[j]);
          } else if (
            newArr[i].name == "queen" &&
            newArr[i].queenMove(
              arr,
              whiteKingPmoves[j].slice(0, 1).toString(),
              parseInt(whiteKingPmoves[j].slice(1, 2))
            )
          ) {
            testf.push(whiteKingPmoves[j]);
          }
        }
      }
    }
    for (let i = 0; i < testf.length; i++) {
      for (let j = 0; j < whiteKingPmoves.length; j++) {
        if (testf[i].toString() == whiteKingPmoves[j].toString()) {
          let io2 = whiteKingPmoves.indexOf(whiteKingPmoves[j]);
          if (io2 > -1) {
            whiteKingPmoves.splice(io2, 1);
          }
        }
      }
    }
    if (onlyWhite.length > 0) {
      whiteKingPmoves = [...whiteKingPmoves, ...onlyWhite];
      for (let i = 0; i < newArr.length; i++) {
        for (let j = 0; j < onlyWhite.length; j++) {
          if (
            newArr[i].cover(
              arr,
              onlyWhite[j].slice(0, 1).toString(),
              parseInt(onlyWhite[j].slice(1, 2))
            )
          ) {
            let io = whiteKingPmoves.indexOf(onlyWhite[j]);
            if (io > -1) {
              whiteKingPmoves.splice(io, 1);
            }
          }
        }
      }
    }


    if (whiteKingPmoves.length == 0 && onlyWhite.length > 0) {
      return true;
    } else if (whiteKingPmoves.length > 0) {
      
      return whiteKingPmoves;
    } else {
      return [];
    }
  }

  static whiteKingPossibleMoves(arr) {
    let pieces = [
      queenBlack,
      kingBlack,
      knight1Black,
      rook1Black,
      bishop1Black,
      knight2Black,
      rook2Black,
      bishop2Black,
      pawn1,
      pawn2,
      pawn3,
      pawn4,
      pawn5,
      pawn6,
      pawn7,
      pawn8,
    ];

    let ya = [1, 2, 3, 4, 5, 6, 7, 8];
    let xa = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let kw = localStorage.getItem("kingWhite");
    let xAxw = kw.substring(kw.length - 4, kw.length - 3);
    let yAxw = parseInt(kw.substring(kw.length - 2, kw.length - 1));
    let kb = localStorage.getItem("kingBlack");
    let xAxb = kb.substring(kb.length - 4, kb.length - 3);
    let yAxb = parseInt(kb.substring(kb.length - 2, kb.length - 1));
    let ioxf = xa.indexOf(xAxw); //for white king
    let ioyf = ya.indexOf(yAxw);
    let ioxfb = xa.indexOf(xAxb); //for black king
    let ioyfb = ya.indexOf(yAxb);
    let newArr = [];
    let km = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length > 2) {
        let g = arr[i];

        if (g[2].color == "black") {
          km.push(g[2]);
        }
      }
    }

    for (let j = 0; j < km.length; j++) {
      for (let i = 0; i < pieces.length; i++) {
        if (km[j].spec == pieces[i].spec) {
          newArr.push(pieces[i]);
        }
      }
    }

    let whiteKingPmoves = [];
    let onlyBlack = [];

    for (let h = 0; h < arr.length; h++) {
      if (
        ((arr[h].slice(0, 1).toString() == xa[ioxf] ||
          arr[h].slice(0, 1).toString() == xa[ioxf + 1] ||
          arr[h].slice(0, 1).toString() == xa[ioxf - 1]) &&
          (parseInt(arr[h].slice(1, 2)) == ya[ioyf + 1] ||
            parseInt(arr[h].slice(1, 2)) == ya[ioyf - 1])) ||
        ((parseInt(arr[h].slice(1, 2)) == ya[ioyf] ||
          parseInt(arr[h].slice(1, 2)) == ya[ioyf + 1] ||
          parseInt(arr[h].slice(1, 2)) == ya[ioyf - 1]) &&
          (arr[h].slice(0, 1).toString() == xa[ioxf + 1] ||
            arr[h].slice(0, 1).toString() == xa[ioxf - 1])) ||
        (arr[h].slice(1, 2).toString() == ya[ioyf] &&
          (arr[h].slice(0, 1).toString() == xa[ioxf - 1] ||
            arr[h].slice(0, 1).toString() == xa[ioxf + 1])) ||
        (arr[h].slice(0, 1).toString() == xa[ioxf] &&
          (parseInt(arr[h].slice(1, 2)) == ya[ioyf - 1] ||
            parseInt(arr[h].slice(1, 2)) == ya[ioyf + 1]))
      ) {
        let o = arr[h];
        if (arr[h].length < 3) {
          whiteKingPmoves.push(arr[h]);
        } else if (arr[h].length > 2 && o[2].color == "black") {
          onlyBlack.push(arr[h]);
        }
      }
    }
    let testf = [];
    if (whiteKingPmoves.length > 0) {
      for (let i = 0; i < newArr.length; i++) {
        for (let j = 0; j < whiteKingPmoves.length; j++) {
          if (newArr[i].name == "king") {
            continue;
          } else if (
            newArr[i].name == "pawn" &&
            newArr[i].pawnMove(
              whiteKingPmoves[j].slice(0, 1).toString(),
              parseInt(whiteKingPmoves[j].slice(1, 2))
            )
          ) {
            testf.push(whiteKingPmoves[j]);
          } else if (
            newArr[i].name == "knight" &&
            newArr[i].knightMove(
              whiteKingPmoves[j].slice(0, 1).toString(),
              parseInt(whiteKingPmoves[j].slice(1, 2))
            )
          ) {
            testf.push(whiteKingPmoves[j]);
          } else if (
            newArr[i].name == "bishop" &&
            newArr[i].bishopMove(
              arr,
              whiteKingPmoves[j].slice(0, 1).toString(),
              parseInt(whiteKingPmoves[j].slice(1, 2))
            )
          ) {
            testf.push(whiteKingPmoves[j]);
          } else if (
            newArr[i].name == "rook" &&
            newArr[i].rookMove(
              arr,
              whiteKingPmoves[j].slice(0, 1).toString(),
              parseInt(whiteKingPmoves[j].slice(1, 2))
            )
          ) {
            testf.push(whiteKingPmoves[j]);
          } else if (
            newArr[i].name == "queen" &&
            newArr[i].queenMove(
              arr,
              whiteKingPmoves[j].slice(0, 1).toString(),
              parseInt(whiteKingPmoves[j].slice(1, 2))
            )
          ) {
            testf.push(whiteKingPmoves[j]);
          }
        }
      }
    }
    for (let i = 0; i < testf.length; i++) {
      for (let j = 0; j < whiteKingPmoves.length; j++) {
        if (testf[i].toString() == whiteKingPmoves[j].toString()) {
          let io2 = whiteKingPmoves.indexOf(whiteKingPmoves[j]);
          if (io2 > -1) {
            whiteKingPmoves.splice(io2, 1);
          }
        }
      }
    }

    if (onlyBlack.length > 0) {
      whiteKingPmoves = [...whiteKingPmoves, ...onlyBlack];
      for (let i = 0; i < newArr.length; i++) {
        for (let j = 0; j < onlyBlack.length; j++) {
          if (
            newArr[i].cover(
              arr,
              onlyBlack[j].slice(0, 1).toString(),
              parseInt(onlyBlack[j].slice(1, 2))
            )
          ) {
            let io = whiteKingPmoves.indexOf(onlyBlack[j]);
            if (io > -1) {
              whiteKingPmoves.splice(io, 1);
            }
          }
        }
      }
    }

    if (whiteKingPmoves.length == 0 && onlyBlack.length > 0) {
      return true;
    } else if (whiteKingPmoves.length > 0) {
      return whiteKingPmoves;
    } else {
      return [];
    }
  }
  check(arr, x, y) {
    let xa = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let ls = localStorage.getItem(this.spec);
    let xAx = ls.substring(ls.length - 4, ls.length - 3);
    let yAx = parseInt(ls.substring(ls.length - 2, ls.length - 1));

    if (this.name == "pawn" && this.color == "white") {
      if (
        [x, y].toString() == [xa[xa.indexOf(xAx) + 1], yAx + 1] ||
        [x, y].toString() == [xa[xa.indexOf(xAx) - 1], yAx + 1]
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (this.name == "pawn" && this.color == "black") {
      if (
        [x, y].toString() == [xa[xa.indexOf(xAx) + 1], yAx - 1] ||
        [x, y].toString() == [xa[xa.indexOf(xAx) - 1], yAx - 1]
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (this.name == "bishop") {
      if (y != yAx && x != xAx && [x, y].toString() != [xAx, yAx].toString()) {
        let ya = [1, 2, 3, 4, 5, 6, 7, 8];
        let ioxf = xa.indexOf(xAx);
        let ioyf = ya.indexOf(yAx);
        let iox = xa.indexOf(x);
        let ioy = ya.indexOf(y);
        let pd = [];
        let pa = [];
        let ka = [];
        let kd = [];

        firstloop: for (let i = ioyf; i < ya.length; i++) {
          for (let j = ioxf + 1; j < xa.length; j++) {
            if (xa.indexOf(xa[j]) <= 7 && ya.indexOf(xa[i++]) <= 7) {
              pd.push([xa[j], ya[i]]);

              if (xa[j] == "H" || ya[i] == 8) {
                break firstloop;
              }
            }
          }
        }

        secondloop: for (let i = ioyf + 1; i <= ya.length + 1; i++) {
          for (let j = ioxf - 1; j >= 0; j--) {
            if(xa.indexOf(xa[j])>=0 && ya[i]<=8){
            pa.push([xa[j], ya[i++]]);
            if (xa[j] == "A" || ya[i - 1] == 8) {
              break secondloop;
            }
            }
          }
        }

      console.log(pa);

        thirdloop: for (let i = ioyf - 1; i >= 0; i--) {
          for (let j = ioxf - 1; j >= 0; j--) {
            if (xa.indexOf(xa[j]) >= 0 && ya[i] >= 0) {
              ka.push([xa[j], ya[i--]]);
              if (xa[j] == "A" || ya[i] == 0) {
                break thirdloop;
              }
            }
          }
        }

        fourthloop: for (let i = ioyf - 1; i >= 0; i--) {
          for (let j = ioxf + 1; j < xa.length; j++) {
            if (xa.indexOf(xa[j]) <= 7 && ya[i] >= 0) {
              kd.push([xa[j], ya[i--]]);
              if (xa[j] == "H" || ya[i] == 0) {
                break fourthloop;
              }
            }
          }
        }

        let testArr = [...pd, ...kd, ...ka, ...pa];

        let test = [];
        for (let i = 0; i < testArr.length; i++) {
          if (testArr[i].toString() == [x, y].toString()) {
            test.push(testArr[i]);
          }
        }

        if (ioyf < ioy && ioxf < iox) {
          let panwdeksia = [];
          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < pd.length; j++) {
              if (pd[j].toString() == arr[k].slice(0, 2).toString()) {
                panwdeksia.push(arr[k]);
              }
            }
          }

          let nearest = panwdeksia.find((x) => x.length == 3);

          if (!nearest) {
            return false;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (
              (this.color != fc && q.spec == "kingWhite") ||
              q.spec == "kingBlack"
            ) {
              return true;
            } else {
              return false;
            }
          }
        } else if (yAx < y && iox < ioxf) {
          let panwaristera = [];
          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < pa.length; j++) {
              if (pa[j].toString() == arr[k].slice(0, 2).toString()) {
                panwaristera.push(arr[k]);
              }
            }
          }
          panwaristera = panwaristera.reverse();
          let nearest = panwaristera.find((x) => x.length == 3);
          console.log(nearest);
          console.log(panwaristera)
          if (!nearest) {
            return false;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (
              (this.color != fc && q.spec == "kingWhite") ||
              q.spec == "kingBlack"
            ) {
              return true;
            } else {
              return false;
            }
          }
        } else if (yAx > y && xAx > x) {
          let katwaristera = [];

          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < ka.length; j++) {
              if (ka[j].toString() == arr[k].slice(0, 2).toString()) {
                katwaristera.push(arr[k]);
              }
            }
          }
          katwaristera = katwaristera.reverse();
          let nearest = katwaristera.find((x) => x.length == 3);
         
          console.log(nearest);
          console.log(katwaristera)
          if (!nearest) {
            return false;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (
              (this.color != fc && q.spec == "kingWhite") ||
              q.spec == "kingBlack"
            ) {
              return true;
            } else {
              return false;
            }
          }
        } else if (yAx > y && ioxf < iox) {
          let katwdeksia = [];

          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < kd.length; j++) {
              if (kd[j].toString() == arr[k].slice(0, 2).toString()) {
                katwdeksia.push(arr[k]);
              }
            }
          }

          let nearest = katwdeksia.find((x) => x.length == 3);

          if (!nearest) {
            return false;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (
              (this.color != fc && q.spec == "kingWhite") ||
              q.spec == "kingBlack"
            ) {
              return true;
            } else {
              return false;
            }
          }
        }
      }
    }
    if (this.name == "rook") {
      let arra = [];
      let arrx = [];

      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].slice(0, 1).toString() == xAx &&
          parseInt(arr[i].slice(1, 2)) != yAx
        ) {
          arra.push(arr[i]);
        }
      }

      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].slice(0, 1).toString() != xAx &&
          parseInt(arr[i].slice(1, 2)) == yAx
        ) {
          arrx.push(arr[i]);
        }
      }
      let f = [...arra, ...arrx];
      let h = [];
      for (let i = 0; i < f.length; i++) {
        if (f[i].slice(0, 2).toString() == [x, y].toString()) {
          h.push(f[i]);
        }
      }
      if (h.length == 0) {
        return false;
      } else if (yAx < y && x == xAx) {
        let possibleMove = [];
        for (let l = 0; l < arra.length; l++) {
          if (
            parseInt(arra[l].slice(1, 2)) <= y &&
            parseInt(arra[l].slice(1, 2)) > yAx
          ) {
            possibleMove.push(arra[l]);
          } else {
            break;
          }
        }

        let nearest = possibleMove.find((x) => x.length == 3);

        if (!nearest) {
          return false;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (
            (this.color == "black" && q.color == "white") ||
            (this.color == "white" && q.color == "black")
          ) {
            return true;
          } else {
            return false;
          }
        }
      }
      if (yAx > y && x == xAx) {
        let possibleMove = [];
        let g = arra.reverse();
        for (let b = 0; b < arra.length; b++) {
          if (
            parseInt(g[b].slice(1, 2)) >= y &&
            parseInt(g[b].slice(1, 2)) <= yAx
          ) {
            possibleMove.push(g[b]);
          } else {
            break;
          }
        }

        let nearest = possibleMove.find((x) => x.length == 3);

        if (!nearest) {
          return false;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (
            (this.color == "black" && q.color == "white") ||
            (this.color == "white" && q.color == "black")
          ) {
            return true;
          } else {
            return false;
          }
        }
      }

      if (xa.indexOf(xAx) < xa.indexOf(x) && y == yAx) {
        let possibleMove = [];
        for (let b = 0; b < arrx.length; b++) {
          if (
            xa.indexOf(arrx[b].slice(0, 1).toString()) <=
              xa.indexOf(x.toString()) &&
            xa.indexOf(arrx[b].slice(0, 1).toString()) >=
              xa.indexOf(xAx.toString())
          ) {
            possibleMove.push(arrx[b]);
          } else {
            break;
          }
        }
        let nearest = possibleMove.find((x) => x.length == 3);

        if (!nearest) {
          return false;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (
            (this.color == "black" && q.color == "white") ||
            (this.color == "white" && q.color == "black")
          ) {
            return true;
          } else {
            return false;
          }
        }
      }

      if (xa.indexOf(xAx) > xa.indexOf(x) && y == yAx) {
        let g = arrx.reverse();
        let possibleMove = [];
        for (let b = 0; b < arrx.length; b++) {
          if (
            xa.indexOf(g[b].slice(0, 1).toString()) >=
              xa.indexOf(x.toString()) &&
            xa.indexOf(g[b].slice(0, 1).toString()) <=
              xa.indexOf(xAx.toString())
          ) {
            possibleMove.push(g[b]);
          } else {
            break;
          }
        }
        let nearest = possibleMove.find((x) => x.length == 3);

        if (!nearest) {
          return false;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;

          if (
            (this.color == "black" && q.color == "white") ||
            (this.color == "white" && q.color == "black")
          ) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
    if (this.name == "queen") {
      let arra = [];
      let arrx = [];

      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].slice(0, 1).toString() == xAx &&
          parseInt(arr[i].slice(1, 2)) != yAx
        ) {
          arra.push(arr[i]);
        }
      }

      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].slice(0, 1).toString() != xAx &&
          parseInt(arr[i].slice(1, 2)) == yAx
        ) {
          arrx.push(arr[i]);
        }
      }
      let f = [...arra, ...arrx];
      let h = [];
      for (let i = 0; i < f.length; i++) {
        if (f[i].slice(0, 2).toString() == [x, y].toString()) {
          h.push(f[i]);
        }
      }
      if (h.length == 0) {
        return false;
      } else if (yAx < y && x == xAx) {
        let possibleMove = [];
        for (let l = 0; l < arra.length; l++) {
          if (
            parseInt(arra[l].slice(1, 2)) <= y &&
            parseInt(arra[l].slice(1, 2)) > yAx
          ) {
            possibleMove.push(arra[l]);
          } else {
            break;
          }
        }

        let nearest = possibleMove.find((x) => x.length == 3);

        if (!nearest) {
          return false;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (
            (this.color == "black" && q.color == "white") ||
            (this.color == "white" && q.color == "black")
          ) {
            return true;
          } else {
            return false;
          }
        }
      }
      if (yAx > y && x == xAx) {
        let possibleMove = [];
        let g = arra.reverse();
        for (let b = 0; b < arra.length; b++) {
          if (
            parseInt(g[b].slice(1, 2)) >= y &&
            parseInt(g[b].slice(1, 2)) <= yAx
          ) {
            possibleMove.push(g[b]);
          } else {
            break;
          }
        }

        let nearest = possibleMove.find((x) => x.length == 3);

        if (!nearest) {
          return false;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (
            (this.color == "black" && q.color == "white") ||
            (this.color == "white" && q.color == "black")
          ) {
            return true;
          } else {
            return false;
          }
        }
      }

      if (xa.indexOf(xAx) < xa.indexOf(x) && y == yAx) {
        let possibleMove = [];
        for (let b = 0; b < arrx.length; b++) {
          if (
            xa.indexOf(arrx[b].slice(0, 1).toString()) <=
              xa.indexOf(x.toString()) &&
            xa.indexOf(arrx[b].slice(0, 1).toString()) >=
              xa.indexOf(xAx.toString())
          ) {
            possibleMove.push(arrx[b]);
          } else {
            break;
          }
        }
        let nearest = possibleMove.find((x) => x.length == 3);

        if (!nearest) {
          return false;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (
            (this.color == "black" && q.color == "white") ||
            (this.color == "white" && q.color == "black")
          ) {
            return true;
          } else {
            return false;
          }
        }
      }

      if (xa.indexOf(xAx) > xa.indexOf(x) && y == yAx) {
        let g = arrx.reverse();
        let possibleMove = [];
        for (let b = 0; b < arrx.length; b++) {
          if (
            xa.indexOf(g[b].slice(0, 1).toString()) >=
              xa.indexOf(x.toString()) &&
            xa.indexOf(g[b].slice(0, 1).toString()) <=
              xa.indexOf(xAx.toString())
          ) {
            possibleMove.push(g[b]);
          } else {
            break;
          }
        }
        let nearest = possibleMove.find((x) => x.length == 3);

        if (!nearest) {
          return false;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;

          if (
            (this.color == "black" && q.color == "white") ||
            (this.color == "white" && q.color == "black")
          ) {
            return true;
          } else {
            return false;
          }
        }
      }
     
      if (y != yAx && x != xAx && [x, y].toString() != [xAx, yAx].toString()) {
        let ya = [1, 2, 3, 4, 5, 6, 7, 8];
        let ioxf = xa.indexOf(xAx);
        let ioyf = ya.indexOf(yAx);
        let iox = xa.indexOf(x);
        let ioy = ya.indexOf(y);
        let pd = [];
        let pa = [];
        let ka = [];
        let kd = [];

        firstloop: for (let i = ioyf; i < ya.length; i++) {
          for (let j = ioxf + 1; j < xa.length; j++) {
            if (xa.indexOf(xa[j]) <= 7 && ya.indexOf(xa[i++]) <= 7) {
              pd.push([xa[j], ya[i]]);

              if (xa[j] == "H" || ya[i] == 8) {
                break firstloop;
              }
            }
          }
        }

        secondloop: for (let i = ioyf + 1; i <= ya.length + 1; i++) {
          for (let j = ioxf - 1; j >= 0; j--) {
            if(xa.indexOf(xa[j])>=0 && ya[i]<=8){
            pa.push([xa[j], ya[i++]]);
            if (xa[j] == "A" || ya[i - 1] == 8) {
              break secondloop;
            }
            }
          }
        }

      console.log(pa);

        thirdloop: for (let i = ioyf - 1; i >= 0; i--) {
          for (let j = ioxf - 1; j >= 0; j--) {
            if (xa.indexOf(xa[j]) >= 0 && ya[i] >= 0) {
              ka.push([xa[j], ya[i--]]);
              if (xa[j] == "A" || ya[i] == 0) {
                break thirdloop;
              }
            }
          }
        }

        fourthloop: for (let i = ioyf - 1; i >= 0; i--) {
          for (let j = ioxf + 1; j < xa.length; j++) {
            if (xa.indexOf(xa[j]) <= 7 && ya[i] >= 0) {
              kd.push([xa[j], ya[i--]]);
              if (xa[j] == "H" || ya[i] == 0) {
                break fourthloop;
              }
            }
          }
        }

        let testArr = [...pd, ...kd, ...ka, ...pa];

        let test = [];
        for (let i = 0; i < testArr.length; i++) {
          if (testArr[i].toString() == [x, y].toString()) {
            test.push(testArr[i]);
          }
        }

        if (ioyf < ioy && ioxf < iox) {
          let panwdeksia = [];
          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < pd.length; j++) {
              if (pd[j].toString() == arr[k].slice(0, 2).toString()) {
                panwdeksia.push(arr[k]);
              }
            }
          }

          let nearest = panwdeksia.find((x) => x.length == 3);

          if (!nearest) {
            return false;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (
              (this.color != fc && q.spec == "kingWhite") ||
              q.spec == "kingBlack"
            ) {
              return true;
            } else {
              return false;
            }
          }
        } else if (yAx < y && iox < ioxf) {
          let panwaristera = [];
          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < pa.length; j++) {
              if (pa[j].toString() == arr[k].slice(0, 2).toString()) {
                panwaristera.push(arr[k]);
              }
            }
          }
          panwaristera = panwaristera.reverse();
          let nearest = panwaristera.find((x) => x.length == 3);
          console.log(nearest);
          console.log(panwaristera)
          if (!nearest) {
            return false;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (
              (this.color != fc && q.spec == "kingWhite") ||
              q.spec == "kingBlack"
            ) {
              return true;
            } else {
              return false;
            }
          }
        } else if (yAx > y && xAx > x) {
          let katwaristera = [];

          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < ka.length; j++) {
              if (ka[j].toString() == arr[k].slice(0, 2).toString()) {
                katwaristera.push(arr[k]);
              }
            }
          }
          katwaristera = katwaristera.reverse();
          let nearest = katwaristera.find((x) => x.length == 3);
         
          console.log(nearest);
          console.log(katwaristera)
          if (!nearest) {
            return false;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (
              (this.color != fc && q.spec == "kingWhite") ||
              q.spec == "kingBlack"
            ) {
              return true;
            } else {
              return false;
            }
          }
        } else if (yAx > y && ioxf < iox) {
          let katwdeksia = [];

          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < kd.length; j++) {
              if (kd[j].toString() == arr[k].slice(0, 2).toString()) {
                katwdeksia.push(arr[k]);
              }
            }
          }

          let nearest = katwdeksia.find((x) => x.length == 3);

          if (!nearest) {
            return false;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (
              (this.color != fc && q.spec == "kingWhite") ||
              q.spec == "kingBlack"
            ) {
              return true;
            } else {
              return false;
            }
          }
        }
      }
    }
    if (this.name == "knight") {
      let ya = [1, 2, 3, 4, 5, 6, 7, 8];

      let ioxf = xa.indexOf(xAx);
      let ioyf = ya.indexOf(yAx);
      let iox = xa.indexOf(x);
      let ioy = ya.indexOf(y);
      if (x == xAx || y == yAx) {
        return;
      } else if (
        (x == xa[ioxf + 1] && y == ya[ioyf + 2]) ||
        (x == xa[ioxf + 2] && y == ya[ioyf + 1]) ||
        (x == xa[ioxf + 1] && y == ya[ioyf - 2]) ||
        (x == xa[ioxf - 2] && y == ya[ioyf + 1]) ||
        (x == xa[ioxf - 1] && y == ya[ioyf + 2]) ||
        (x == xa[ioxf + 2] && y == ya[ioyf - 1]) ||
        (x == xa[ioxf - 1] && y == ya[ioyf - 2]) ||
        (x == xa[ioxf - 2] && y == ya[ioyf - 1])
      ) {
        let kouti = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].slice(0, 2).toString() == [x, y].toString()) {
            kouti.push(arr[i]);
          }
        }
        if (kouti[0].length > 2) {
          let obj = kouti[0];
          let c = obj[2];
          if (c.color != this.color) {
            return true;
          } else return false;
        }
      }
    }
  }
  cover(arr, x, y) {
    let xa = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let ls = localStorage.getItem(this.spec);
    let xAx = ls.substring(ls.length - 4, ls.length - 3);
    let yAx = parseInt(ls.substring(ls.length - 2, ls.length - 1));

    if (this.name == "pawn" && this.color == "white") {
      if (
        y == yAx + 1 &&
        xAx != x &&
        (x == xa[xa.indexOf(xAx) + 1] || x == xa[xa.indexOf(xAx) - 1])
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (this.name == "pawn" && this.color == "black") {
      if (
        y == yAx - 1 &&
        xAx != x &&
        (x == xa[xa.indexOf(xAx) + 1] || x == xa[xa.indexOf(xAx) - 1])
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (this.name == "bishop") {
      if (y != yAx && x != xAx && [x, y].toString() != [xAx, yAx].toString()) {
        let ya = [1, 2, 3, 4, 5, 6, 7, 8];
        let ioxf = xa.indexOf(xAx);
        let ioyf = ya.indexOf(yAx);
        let iox = xa.indexOf(x);
        let ioy = ya.indexOf(y);
        let pd = [];
        let pa = [];
        let ka = [];
        let kd = [];

        firstloop: for (let i = ioyf; i < ya.length; i++) {
          for (let j = ioxf + 1; j < xa.length; j++) {
            if (xa.indexOf(xa[j]) <= 7 && ya.indexOf(xa[i++]) <= 7) {
              pd.push([xa[j], ya[i]]);

              if (xa[j] == "H" || ya[i] == 8) {
                break firstloop;
              }
            }
          }
        }

        secondloop: for (let i = ioyf + 1; i <= ya.length + 1; i++) {
          for (let j = ioxf - 1; j >= 0; j--) {
            // if(xa.indexOf(xa[j])>=0 && ya[i]<=7){
            pa.push([xa[j], ya[i++]]);
            if (xa[j] == "A" || ya[i - 1] == 8) {
              break secondloop;
            }
            // }
          }
        }

        thirdloop: for (let i = ioyf - 1; i >= 0; i--) {
          for (let j = ioxf - 1; j >= 0; j--) {
            if (xa.indexOf(xa[j]) >= 0 && ya[i] >= 0) {
              ka.push([xa[j], ya[i--]]);
              if (xa[j] == "A" || ya[i] == 0) {
                break thirdloop;
              }
            }
          }
        }

        fourthloop: for (let i = ioyf - 1; i >= 0; i--) {
          for (let j = ioxf + 1; j < xa.length; j++) {
            if (xa.indexOf(xa[j]) <= 7 && ya[i] >= 0) {
              kd.push([xa[j], ya[i--]]);
              if (xa[j] == "H" || ya[i] == 0) {
                break fourthloop;
              }
            }
          }
        }

        let testArr = [...pd, ...kd, ...ka, ...pa];
        let test = [];

        for (let i = 0; i < testArr.length; i++) {
          if (testArr[i].toString() == [x, y].toString()) {
            test.push(testArr[i]);
          }
        }

        if (test.length == 0) {
          return false;
        } else if (ioyf < ioy && ioxf < iox) {
          let panwdeksia = [];
          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < pd.length; j++) {
              if (pd[j].toString() == arr[k].slice(0, 2).toString()) {
                panwdeksia.push(arr[k]);
              }
            }
          }

          let nearest = panwdeksia.find(
            (x) => x.length == 3 && x[2].name != "king"
          );

          if (!nearest) {
            return false;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return false;
            } else {
              return true;
            }
          }
        }
        if (yAx < y && iox < ioxf) {
          let panwaristera = [];
          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < pa.length; j++) {
              if (pa[j].toString() == arr[k].slice(0, 2).toString()) {
                panwaristera.push(arr[k]);
              }
            }
          }

          let nearest = panwaristera.find(
            (x) => x.length == 3 && x[2].name != "king"
          );

          if (!nearest) {
            return false;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return false;
            } else {
              return true;
            }
          }
        }
        if (yAx > y && xAx > x) {
          let katwaristera = [];

          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < ka.length; j++) {
              if (ka[j].toString() == arr[k].slice(0, 2).toString()) {
                katwaristera.push(arr[k]);
              }
            }
          }

          let nearest = katwaristera.find(
            (x) => x.length == 3 && x[2].name != "king"
          );

          if (!nearest) {
            return false;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return false;
            } else {
              return true;
            }
          }
        }
        if (yAx > y && ioxf < iox) {
          let katwdeksia = [];

          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < kd.length; j++) {
              if (kd[j].toString() == arr[k].slice(0, 2).toString()) {
                katwdeksia.push(arr[k]);
              }
            }
          }

          let nearest = katwdeksia.find(
            (x) => x.length == 3 && x[2].name != "king"
          );

          if (!nearest) {
            return false;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return false;
            } else {
              return true;
            }
          }
        }
      }
    }
    if (this.name == "rook") {
      let arra = [];
      let arrx = [];

      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].slice(0, 1).toString() == xAx &&
          parseInt(arr[i].slice(1, 2)) != yAx
        ) {
          arra.push(arr[i]);
        }
      }

      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].slice(0, 1).toString() != xAx &&
          parseInt(arr[i].slice(1, 2)) == yAx
        ) {
          arrx.push(arr[i]);
        }
      }
      let f = [...arra, ...arrx];
      let h = [];
      for (let i = 0; i < f.length; i++) {
        if (f[i].slice(0, 2).toString() == [x, y].toString()) {
          h.push(f[i]);
        }
      }
      if (h.length == 0) {
        return false;
      } else if (yAx < y && x == xAx) {
        let possibleMove = [];
        for (let l = 0; l < arra.length; l++) {
          if (
            parseInt(arra[l].slice(1, 2)) <= y &&
            parseInt(arra[l].slice(1, 2)) > yAx
          ) {
            possibleMove.push(arra[l]);
          } else {
            break;
          }
        }

        let nearest = possibleMove.find(
          (x) => x.length == 3 && x[2].name != "king"
        );

        if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color == fc) {
            return true;
          }
        } else {
          return false;
        }
      }
      if (yAx > y && x == xAx) {
        let possibleMove = [];
        let g = arra.reverse();
        for (let b = 0; b < arra.length; b++) {
          if (
            parseInt(g[b].slice(1, 2)) >= y &&
            parseInt(g[b].slice(1, 2)) <= yAx
          ) {
            possibleMove.push(g[b]);
          } else {
            break;
          }
        }

        let nearest = possibleMove.find(
          (x) => x.length == 3 && x[2].name != "king"
        );

        if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color == fc) {
            return true;
          }
        } else {
          return false;
        }
      }

      if (xa.indexOf(xAx) < xa.indexOf(x) && y == yAx) {
        let possibleMove = [];
        for (let b = 0; b < arrx.length; b++) {
          if (
            xa.indexOf(arrx[b].slice(0, 1).toString()) <=
              xa.indexOf(x.toString()) &&
            xa.indexOf(arrx[b].slice(0, 1).toString()) >=
              xa.indexOf(xAx.toString())
          ) {
            possibleMove.push(arrx[b]);
          } else {
            break;
          }
        }
        let nearest = possibleMove.find(
          (x) => x.length == 3 && x[2].name != "king"
        );

        if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color == fc) {
            return true;
          }
        } else {
          return false;
        }
      }

      if (xa.indexOf(xAx) > xa.indexOf(x) && y == yAx) {
        let g = arrx.reverse();
        let possibleMove = [];
        for (let b = 0; b < arrx.length; b++) {
          if (
            xa.indexOf(g[b].slice(0, 1).toString()) >=
              xa.indexOf(x.toString()) &&
            xa.indexOf(g[b].slice(0, 1).toString()) <=
              xa.indexOf(xAx.toString())
          ) {
            possibleMove.push(g[b]);
          } else {
            break;
          }
        }
        let nearest = possibleMove.find(
          (x) => x.length == 3 && x[2].name != "king"
        );

        if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color == fc) {
            return true;
          }
        } else {
          return false;
        }
      }
    }
    if (this.name == "queen") {
      let arra = [];
      let arrx = [];

      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].slice(0, 1).toString() == xAx &&
          arr[i].slice(1, 2).toString() != yAx.toString()
        ) {
          arra.push(arr[i]);
        }
      }

      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].slice(0, 1).toString() != xAx &&
          arr[i].slice(1, 2).toString() == yAx.toString()
        ) {
          arrx.push(arr[i]);
        }
      }
      if ((y == yAx && x != xAx) || (y != yAx && x == xAx)) {
        if (yAx < y) {
          let possibleMove = [];
          for (let b = 0; b < arra.length; b++) {
            let bbb = [];
            bbb.push(arra[b]);

            for (let l = 0; l < bbb.length; l++) {
              if (parseInt(bbb[l].slice(1, 2)) <= y) {
                possibleMove.push(bbb[l]);
              } else {
                break;
              }
            }
          }
          let nearest = possibleMove.find(
            (x) => x.length == 3 && x[2].name != "king"
          );

          if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color == fc) {
              return true;
            }
          } else {
            return false;
          }
        }
        if (yAx > y && x == xAx) {
          let possibleMove = [];
          let g = arra.reverse();
          for (let b = 0; b < arra.length; b++) {
            if (parseInt(g[b].slice(1, 2)) >= y) {
              possibleMove.push(g[b]);
            } else {
              break;
            }
          }

          let nearest = possibleMove.find(
            (x) => x.length == 3 && x[2].name != "king"
          );
          if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color == fc) {
              return true;
            }
          } else {
            return false;
          }
        }

        if (xa.indexOf(xAx) < xa.indexOf(x)) {
          let possibleMove = [];
          for (let b = 0; b < arrx.length; b++) {
            if (
              xa.indexOf(arrx[b].slice(0, 1).toString()) <=
                xa.indexOf(x.toString()) &&
              xa.indexOf(arrx[b].slice(0, 1).toString()) >=
                xa.indexOf(x.toString())
            ) {
              possibleMove.push(arrx[b]);
            } else {
              break;
            }
          }
          let nearest = possibleMove.find(
            (x) => x.length == 3 && x[2].name != "king"
          );
          if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color == fc) {
              return true;
            }
          } else {
            return false;
          }
        }

        if (xa.indexOf(xAx) > xa.indexOf(x)) {
          let g = arrx.reverse();
          let possibleMove = [];
          for (let b = 0; b < arrx.length; b++) {
            if (
              xa.indexOf(g[b].slice(0, 1).toString()) >=
                xa.indexOf(x.toString()) &&
              xa.indexOf(g[b].slice(0, 1).toString()) <=
                xa.indexOf(xAx.toString())
            ) {
              possibleMove.push(g[b]);
            } else {
              break;
            }
          }
          let nearest = possibleMove.find(
            (x) => x.length == 3 && x[2].name != "king"
          );
          if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color == fc) {
              return true;
            }
          } else {
            return false;
          }
        }
      } else if (
        y != yAx &&
        x != xAx &&
        [x, y].toString() != [xAx, yAx].toString()
      ) {
        let ya = [1, 2, 3, 4, 5, 6, 7, 8];
        let ioxf = xa.indexOf(xAx);
        let ioyf = ya.indexOf(yAx);
        let iox = xa.indexOf(x);
        let ioy = ya.indexOf(y);
        let pd = [];
        let pa = [];
        let ka = [];
        let kd = [];

        firstloop: for (let i = ioyf; i < ya.length; i++) {
          for (let j = ioxf + 1; j < xa.length; j++) {
            if (xa.indexOf(xa[j]) <= 7 && ya.indexOf(xa[i++]) <= 7) {
              pd.push([xa[j], ya[i]]);

              if (xa[j] == "H" || ya[i] == 8) {
                break firstloop;
              }
            }
          }
        }

        secondloop: for (let i = ioyf + 1; i <= ya.length + 1; i++) {
          for (let j = ioxf - 1; j >= 0; j--) {
            // if(xa.indexOf(xa[j])>=0 && ya[i]<=7){
            pa.push([xa[j], ya[i++]]);
            if (xa[j] == "A" || ya[i - 1] == 8) {
              break secondloop;
            }
            // }
          }
        }

        thirdloop: for (let i = ioyf - 1; i >= 0; i--) {
          for (let j = ioxf - 1; j >= 0; j--) {
            if (xa.indexOf(xa[j]) >= 0 && ya[i] >= 0) {
              ka.push([xa[j], ya[i--]]);
              if (xa[j] == "A" || ya[i] == 0) {
                break thirdloop;
              }
            }
          }
        }

        fourthloop: for (let i = ioyf - 1; i >= 0; i--) {
          for (let j = ioxf + 1; j < xa.length; j++) {
            if (xa.indexOf(xa[j]) <= 7 && ya[i] >= 0) {
              kd.push([xa[j], ya[i--]]);
              if (xa[j] == "H" || ya[i] == 0) {
                break fourthloop;
              }
            }
          }
        }

        let testArr = [...pd, ...kd, ...ka, ...pa];
        let test = [];

        for (let i = 0; i < testArr.length; i++) {
          if (testArr[i].toString() == [x, y].toString()) {
            test.push(testArr[i]);
          }
        }

        if (test.length == 0) {
          return false;
        } else if (ioyf < ioy && ioxf < iox) {
          let panwdeksia = [];
          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < pd.length; j++) {
              if (pd[j].toString() == arr[k].slice(0, 2).toString()) {
                panwdeksia.push(arr[k]);
              }
            }
          }

          let nearest = panwdeksia.find(
            (x) => x.length == 3 && x[2].name != "king"
          );

          if (!nearest) {
            return false;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return false;
            } else {
              return true;
            }
          }
        }
        if (yAx < y && iox < ioxf) {
          let panwaristera = [];
          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < pa.length; j++) {
              if (pa[j].toString() == arr[k].slice(0, 2).toString()) {
                panwaristera.push(arr[k]);
              }
            }
          }

          let nearest = panwaristera.find(
            (x) => x.length == 3 && x[2].name != "king"
          );

          if (!nearest) {
            return false;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return false;
            } else {
              return true;
            }
          }
        }
        if (yAx > y && xAx > x) {
          let katwaristera = [];

          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < ka.length; j++) {
              if (ka[j].toString() == arr[k].slice(0, 2).toString()) {
                katwaristera.push(arr[k]);
              }
            }
          }

          let nearest = katwaristera.find(
            (x) => x.length == 3 && x[2].name != "king"
          );

          if (!nearest) {
            return false;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return false;
            } else {
              return true;
            }
          }
        }
        if (yAx > y && ioxf < iox) {
          let katwdeksia = [];

          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < kd.length; j++) {
              if (kd[j].toString() == arr[k].slice(0, 2).toString()) {
                katwdeksia.push(arr[k]);
              }
            }
          }

          let nearest = katwdeksia.find(
            (x) => x.length == 3 && x[2].name != "king"
          );

          if (!nearest) {
            return false;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return false;
            } else {
              return true;
            }
          }
        }
      }
    }
    if (this.name == "knight") {
      let ya = [1, 2, 3, 4, 5, 6, 7, 8];

      let ioxf = xa.indexOf(xAx);
      let ioyf = ya.indexOf(yAx);
      let iox = xa.indexOf(x);
      let ioy = ya.indexOf(y);
      if (x == xAx || y == yAx) {
        return;
      } else if (
        (x == xa[ioxf + 1] && y == ya[ioyf + 2]) ||
        (x == xa[ioxf + 2] && y == ya[ioyf + 1]) ||
        (x == xa[ioxf + 1] && y == ya[ioyf - 2]) ||
        (x == xa[ioxf - 2] && y == ya[ioyf + 1]) ||
        (x == xa[ioxf - 1] && y == ya[ioyf + 2]) ||
        (x == xa[ioxf + 2] && y == ya[ioyf - 1]) ||
        (x == xa[ioxf - 1] && y == ya[ioyf - 2]) ||
        (x == xa[ioxf - 2] && y == ya[ioyf - 1])
      ) {
        let kouti = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].slice(0, 2).toString() == [x, y].toString()) {
            kouti.push(arr[i]);
          }
        }
        if (kouti[0].length > 2) {
          let obj = kouti[0];
          let c = obj[2];
          if (c.color == this.color) {
            return true;
          } else return false;
        }
      }
    }
    if (this.name == "king") {
      let ya = [1, 2, 3, 4, 5, 6, 7, 8];
      let ioxf = xa.indexOf(xAx);
      let ioyf = ya.indexOf(yAx);
      let iox = xa.indexOf(x);
      let ioy = ya.indexOf(y);
      let kingMoves = [];
      if (
        ((x == xa[ioxf] || x == xa[ioxf + 1] || x == xa[ioxf - 1]) &&
          (y == ya[ioyf + 1] || y == ya[ioyf - 1])) ||
        ((y == ya[ioyf] || y == ya[ioyf + 1] || y == ya[ioyf - 1]) &&
          (iox == xa[ioxf + 1] || iox == xa[ioxf - 1])) ||
        (y == yAx && (x == xa[ioxf + 1] || x == xa[ioxf - 1]))
      ) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].slice(0, 2).toString() == [x, y].toString()) {
            kingMoves.push(arr[i]);
          }
        }
        if (kingMoves[0].length > 2) {
          let obj = kingMoves[0];
          let c = obj[2];
          if (c.color == this.color) {
            return true;
          } else return false;
        }
      }
    }
  }
  move(arr, x, y) {
    // let possibleMove;
    let xa = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let ls = localStorage.getItem(this.spec);
    let xAx = ls.substring(ls.length - 4, ls.length - 3);
    let yAx = parseInt(ls.substring(ls.length - 2, ls.length - 1));

    if (this.name == "pawn" && this.color == "white") {
      if (x == xAx && (y > yAx + 2 || y <= yAx)) {
        if (yAx == 2) {
          return false;
        }
      } else if (y <= yAx + 2 && y > yAx && xAx == x && yAx == 2) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].slice(0, 2).toString() == [x, y].toString()) {
            if (arr[i].length <= 2) {
              return true;
            } else {
              return false;
            }
          }
        }
      } else if (y == yAx + 1 && xAx == x) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].slice(0, 2).toString() == [x, y].toString()) {
            if (arr[i].length <= 2) {
              return true;
            } else {
              return false;
            }
          }
        }
      } else if (
        y == yAx + 1 && xAx != x && (x == xa[xa.indexOf(xAx) + 1] ||
        x == xa[xa.indexOf(xAx) - 1])
      ) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].slice(0, 2).toString() == [x, y].toString()) {
            if (arr[i].length <= 2) {
              return false;
            } else {
              let g = arr[i];
              if (g[2].color != this.color) {
                return true;
              } else {
                return false;
              }
            }
          }
        }
      } else {
        return false;
      }
    }
    if (this.name == "pawn" && this.color == "black") {
      if (x == xAx && yAx == 7 && (y < yAx - 2 || y >= yAx)) {
        return false;
      } else if (y >= yAx - 2 && y < yAx && xAx == x && yAx == 7) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].slice(0, 2).toString() == [x, y].toString()) {
            if (arr[i].length <= 2) {
              return true;
            } else {
              return false;
            }
          }
        }
      } else if (y == yAx - 1 && xAx == x) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].slice(0, 2).toString() == [x, y].toString()) {
            if (arr[i].length <= 2) {
              return true;
            } else {
              return false;
            }
          }
        }
      } else if (
        y == yAx - 1 && xAx != x &&( x == xa[xa.indexOf(xAx) + 1] ||
        x == xa[xa.indexOf(xAx) - 1])
      ) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].slice(0, 2).toString() == [x, y].toString()) {
            if (arr[i].length <= 2) {
              return false;
            } else {
              let g = arr[i];
              if (g[2].color != this.color) {
                return true;
              } else {
                return false;
              }
            }
          }
        }
      } else {
        return false;
      }
    }
    if (this.name == "bishop") {
      if (y != yAx && x != xAx && [x, y].toString() != [xAx, yAx].toString()) {
        let ya = [1, 2, 3, 4, 5, 6, 7, 8];
        let ioxf = xa.indexOf(xAx);
        let ioyf = ya.indexOf(yAx);
        let iox = xa.indexOf(x);
        let ioy = ya.indexOf(y);
        let pd = [];
        let pa = [];
        let ka = [];
        let kd = [];

        firstloop: for (let i = ioyf; i < ya.length; i++) {
          for (let j = ioxf + 1; j < xa.length; j++) {
            if (xa.indexOf(xa[j]) <= 7 && ya.indexOf(xa[i++]) <= 7) {
              pd.push([xa[j], ya[i]]);

              if (xa[j] == "H" || ya[i] == 8) {
                break firstloop;
              }
            }
          }
        }

        secondloop: for (let i = ioyf + 1; i <= ya.length + 1; i++) {
          for (let j = ioxf - 1; j >= 0; j--) {
            // if(xa.indexOf(xa[j])>=0 && ya[i]<=7){
            pa.push([xa[j], ya[i++]]);
            if (xa[j] == "A" || ya[i - 1] == 8) {
              break secondloop;
            }
            // }
          }
        }

        thirdloop: for (let i = ioyf - 1; i >= 0; i--) {
          for (let j = ioxf - 1; j >= 0; j--) {
            if (xa.indexOf(xa[j]) >= 0 && ya[i] >= 0) {
              ka.push([xa[j], ya[i--]]);
              if (xa[j] == "A" || ya[i] == 0) {
                break thirdloop;
              }
            }
          }
        }

        fourthloop: for (let i = ioyf - 1; i >= 0; i--) {
          for (let j = ioxf + 1; j < xa.length; j++) {
            if (xa.indexOf(xa[j]) <= 7 && ya[i] >= 0) {
              kd.push([xa[j], ya[i--]]);
              if (xa[j] == "H" || ya[i] == 0) {
                break fourthloop;
              }
            }
          }
        }

        let testArr = [...pd, ...kd, ...ka, ...pa];
        let test = [];

        for (let i = 0; i < testArr.length; i++) {
          if (testArr[i].toString() == [x, y].toString()) {
            test.push(testArr[i]);
          }
        }

        if (test.length == 0) {
          return false;
        }
        if (ioyf < ioy && ioxf < iox) {
          let panwdeksia = [];
          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < pd.length; j++) {
              if (pd[j].toString() == arr[k].slice(0, 2).toString()) {
                panwdeksia.push(arr[k]);
              }
            }
          }

          let nearest = panwdeksia.find((x) => x.length == 3);

          if (!nearest) {
            return true;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return true;
            } else {
              return false;
            }
          } else if (parseInt(nearest.slice(1, 2)) > y) {
            return true;
          } else if (parseInt(nearest.slice(1, 2)) < y) {
            return false;
          } else {
          }
        }
        if (yAx < y && iox < ioxf) {
          let panwaristera = [];
          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < pa.length; j++) {
              if (pa[j].toString() == arr[k].slice(0, 2).toString()) {
                panwaristera.push(arr[k]);
              }
            }
          }

          let nearest = panwaristera.find((x) => x.length == 3);

          if (!nearest) {
            return true;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return true;
            } else {
              return false;
            }
          } else if (parseInt(nearest.slice(1, 2)) > y) {
            return true;
          } else if (parseInt(nearest.slice(1, 2)) < y) {
            return false;
          }
        }
        if (yAx > y && xAx > x) {
          let katwaristera = [];

          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < ka.length; j++) {
              if (ka[j].toString() == arr[k].slice(0, 2).toString()) {
                katwaristera.push(arr[k]);
              }
            }
          }

          let nearest = katwaristera.find((x) => x.length == 3);

          if (!nearest) {
            return true;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return true;
            } else {
              return false;
            }
          } else if (parseInt(nearest.slice(1, 2)) < y) {
            return true;
          } else if (parseInt(nearest.slice(1, 2)) > y) {
            return false;
          }
        }
        if (yAx > y && ioxf < iox) {
          let katwdeksia = [];

          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < kd.length; j++) {
              if (kd[j].toString() == arr[k].slice(0, 2).toString()) {
                katwdeksia.push(arr[k]);
              }
            }
          }

          let nearest = katwdeksia.find((x) => x.length == 3);

          if (!nearest) {
            return true;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return true;
            } else {
              return false;
            }
          } else if (parseInt(nearest.slice(1, 2)) < y) {
            return true;
          } else if (parseInt(nearest.slice(1, 2)) > y) {
            return false;
          }
        }
      }
    }
    if (this.name == "rook") {
      let arra = [];
      let arrx = [];

      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].slice(0, 1).toString() == xAx &&
          parseInt(arr[i].slice(1, 2)) != yAx
        ) {
          arra.push(arr[i]);
        }
      }

      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].slice(0, 1).toString() != xAx &&
          parseInt(arr[i].slice(1, 2)) == yAx
        ) {
          arrx.push(arr[i]);
        }
      }

      let f = [...arra, ...arrx];
      let h = [];
      for (let i = 0; i < f.length; i++) {
        if (f[i].slice(0, 2).toString() == [x, y].toString()) {
          h.push(f[i]);
        }
      }
      if (h.length == 0) {
        return false;
      } else if (yAx < y && x == xAx) {
        let possibleMove = [];
        for (let l = 0; l < arra.length; l++) {
          if (
            parseInt(arra[l].slice(1, 2)) <= y &&
            parseInt(arra[l].slice(1, 2)) > yAx
          ) {
            possibleMove.push(arra[l]);
          } else {
            break;
          }
        }

        let nearest = possibleMove.find((x) => x.length == 3);

        if (!nearest) {
          return true;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color != fc) {
            return true;
          } else {
            return false;
          }
        } else if (parseInt(nearest.slice(1, 2)) >= y) {
          return true;
        } else {
          return false;
        }
      }
      if (yAx > y && x == xAx) {
        let possibleMove = [];
        let g = arra.reverse();
        for (let b = 0; b < arra.length; b++) {
          if (
            parseInt(g[b].slice(1, 2)) >= y &&
            parseInt(g[b].slice(1, 2)) <= yAx
          ) {
            possibleMove.push(g[b]);
          } else {
            break;
          }
        }

        let nearest = possibleMove.find((x) => x.length == 3);

        if (!nearest) {
          return true;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color != fc) {
            return true;
          } else {
            return false;
          }
        } else if (parseInt(nearest.slice(1, 2)) < y) {
          return true;
        } else if (parseInt(nearest.slice(1, 2)) > y) {
          return false;
        }
      }

      if (xa.indexOf(xAx) < xa.indexOf(x) && y == yAx) {
        let possibleMove = [];
        for (let b = 0; b < arrx.length; b++) {
          if (
            xa.indexOf(arrx[b].slice(0, 1).toString()) <=
              xa.indexOf(x.toString()) &&
            xa.indexOf(arrx[b].slice(0, 1).toString()) >=
              xa.indexOf(xAx.toString())
          ) {
            possibleMove.push(arrx[b]);
          } else {
            break;
          }
        }

        let nearest = possibleMove.find((x) => x.length == 3);
        if (!nearest) {
          return true;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color != fc) {
            return true;
          } else {
            return false;
          }
        } else if (
          xa.indexOf(nearest.slice(0, 1).toString()) <= xa.indexOf(y.toString())
        ) {
          return true;
        } else if (
          xa.indexOf(nearest.slice(0, 1).toString()) >= xa.indexOf(y.toString())
        ) {
          return false;
        }
      }

      if (xa.indexOf(xAx) > xa.indexOf(x) && y == yAx) {
        let g = arrx.reverse();
        let possibleMove = [];
        for (let b = 0; b < arrx.length; b++) {
          if (
            xa.indexOf(g[b].slice(0, 1).toString()) >=
              xa.indexOf(x.toString()) &&
            xa.indexOf(g[b].slice(0, 1).toString()) <=
              xa.indexOf(xAx.toString())
          ) {
            possibleMove.push(g[b]);
          } else {
            break;
          }
        }
        let nearest = possibleMove.find((x) => x.length == 3);
        if (!nearest) {
          return true;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color != fc) {
            return true;
          } else {
            return false;
          }
        } else if (
          xa.indexOf(nearest.slice(0, 1).toString()) <= xa.indexOf(y.toString())
        ) {
          return true;
        } else if (
          xa.indexOf(nearest.slice(0, 1).toString()) >= xa.indexOf(y.toString())
        ) {
          return false;
        }
      }
    }
    if (this.name == "queen") {
      let arra = [];
      let arrx = [];

      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].slice(0, 1).toString() == xAx &&
          arr[i].slice(1, 2).toString() != yAx.toString()
        ) {
          arra.push(arr[i]);
        }
      }

      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].slice(0, 1).toString() != xAx &&
          arr[i].slice(1, 2).toString() == yAx.toString()
        ) {
          arrx.push(arr[i]);
        }
      }

     if ((y == yAx && x != xAx) || (y != yAx && x == xAx)) {
        if (yAx < y) {
          let possibleMove = [];
          for (let b = 0; b < arra.length; b++) {
            let bbb = [];
            bbb.push(arra[b]);

            for (let l = 0; l < bbb.length; l++) {
              if (parseInt(bbb[l].slice(1, 2)) <= y) {
                possibleMove.push(bbb[l]);
              } else {
                break;
              }
            }
          }
          let nearest = possibleMove.find((x) => x.length == 3);
          if (!nearest) {
            return true;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return true;
            } else {
              return false;
            }
          } else if (parseInt(nearest.slice(1, 2)) >= y) {
            return true;
          } else {
            return false;
          }
        }
        if (yAx > y && x == xAx) {
          let possibleMove = [];
          let g = arra.reverse();
          for (let b = 0; b < arra.length; b++) {
            if (parseInt(g[b].slice(1, 2)) >= y) {
              possibleMove.push(g[b]);
            } else {
              break;
            }
          }

          let nearest = possibleMove.find((x) => x.length == 3);

          if (!nearest) {
            return true;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return true;
            } else {
              return false;
            }
          } else if (parseInt(nearest.slice(1, 2)) < y) {
            return true;
          } else if (parseInt(nearest.slice(1, 2)) > y) {
            return false;
          }
        }

        if (xa.indexOf(xAx) < xa.indexOf(x)) {
          let possibleMove = [];
          for (let b = 0; b < arrx.length; b++) {
            if (
              xa.indexOf(arrx[b].slice(0, 1).toString()) <=
                xa.indexOf(x.toString()) &&
              xa.indexOf(arrx[b].slice(0, 1).toString()) >=
                xa.indexOf(x.toString())
            ) {
              possibleMove.push(arrx[b]);
            } else {
              break;
            }
          }
          let nearest = possibleMove.find((x) => x.length == 3);
          if (!nearest) {
            return true;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return true;
            } else {
              return false;
            }
          } else if (
            xa.indexOf(nearest.slice(0, 1).toString()) >=
            xa.indexOf(y.toString())
          ) {
            return true;
          } else if (
            xa.indexOf(nearest.slice(0, 1).toString()) <=
            xa.indexOf(y.toString())
          ) {
            return false;
          }
        }

        if (xa.indexOf(xAx) > xa.indexOf(x)) {
          let g = arrx.reverse();
          let possibleMove = [];
          for (let b = 0; b < arrx.length; b++) {
            if (
              xa.indexOf(g[b].slice(0, 1).toString()) >=
                xa.indexOf(x.toString()) &&
              xa.indexOf(g[b].slice(0, 1).toString()) <=
                xa.indexOf(xAx.toString())
            ) {
              possibleMove.push(g[b]);
            } else {
              break;
            }
          }
          let nearest = possibleMove.find((x) => x.length == 3);
          if (!nearest) {
            return true;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return true;
            } else {
              return false;
            }
          } else if (
            xa.indexOf(nearest.slice(0, 1).toString()) <=
            xa.indexOf(y.toString())
          ) {
            return true;
          } else if (
            xa.indexOf(nearest.slice(0, 1).toString()) >=
            xa.indexOf(y.toString())
          ) {
            return false;
          }
        }
      } else if (
        y != yAx &&
        x != xAx &&
        [x, y].toString() != [xAx, yAx].toString()
      ) {
        let ya = [1, 2, 3, 4, 5, 6, 7, 8];
        let ioxf = xa.indexOf(xAx);
        let ioyf = ya.indexOf(yAx);
        let iox = xa.indexOf(x);
        let ioy = ya.indexOf(y);
        let pd = [];
        let pa = [];
        let ka = [];
        let kd = [];

        firstloop: for (let i = ioyf; i < ya.length; i++) {
          for (let j = ioxf + 1; j < xa.length; j++) {
            if (xa.indexOf(xa[j]) <= 7 && ya.indexOf(xa[i++]) <= 7) {
              pd.push([xa[j], ya[i]]);

              if (xa[j] == "H" || ya[i] == 8) {
                break firstloop;
              }
            }
          }
        }

        secondloop: for (let i = ioyf + 1; i <= ya.length + 1; i++) {
          for (let j = ioxf - 1; j >= 0; j--) {
            // if(xa.indexOf(xa[j])>=0 && ya[i]<=7){
            pa.push([xa[j], ya[i++]]);
            if (xa[j] == "A" || ya[i - 1] == 8) {
              break secondloop;
            }
            // }
          }
        }

        thirdloop: for (let i = ioyf - 1; i >= 0; i--) {
          for (let j = ioxf - 1; j >= 0; j--) {
            if (xa.indexOf(xa[j]) >= 0 && ya[i] >= 0) {
              ka.push([xa[j], ya[i--]]);
              if (xa[j] == "A" || ya[i] == 0) {
                break thirdloop;
              }
            }
          }
        }

        fourthloop: for (let i = ioyf - 1; i >= 0; i--) {
          for (let j = ioxf + 1; j < xa.length; j++) {
            if (xa.indexOf(xa[j]) <= 7 && ya[i] >= 0) {
              kd.push([xa[j], ya[i--]]);
              if (xa[j] == "H" || ya[i] == 0) {
                break fourthloop;
              }
            }
          }
        }

        let testArr = [...pd, ...kd, ...ka, ...pa];
        let test = [];

        for (let i = 0; i < testArr.length; i++) {
          if (testArr[i].toString() == [x, y].toString()) {
            test.push(testArr[i]);
          }
        }

        if (test.length == 0) {
         
          return false;
        } else if (ioyf < ioy && ioxf < iox) {
          let panwdeksia = [];
          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < pd.length; j++) {
              if (pd[j].toString() == arr[k].slice(0, 2).toString()) {
                panwdeksia.push(arr[k]);
              }
            }
          }

          let nearest = panwdeksia.find((x) => x.length == 3);

          if (!nearest) {
            return true;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return true;
            } else {
              return false;
            }
          } else if (parseInt(nearest.slice(1, 2)) > y) {
            return true;
          } else if (parseInt(nearest.slice(1, 2)) < y) {
            return false;
          } else {
          }
        }
        if (yAx < y && iox < ioxf) {
          let panwaristera = [];
          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < pa.length; j++) {
              if (pa[j].toString() == arr[k].slice(0, 2).toString()) {
                panwaristera.push(arr[k]);
              }
            }
          }

          let nearest = panwaristera.find((x) => x.length == 3);

          if (!nearest) {
            return true;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return true;
            } else {
              return false;
            }
          } else if (parseInt(nearest.slice(1, 2)) > y) {
            return true;
          } else if (parseInt(nearest.slice(1, 2)) < y) {
            return false;
          }
        }
        if (yAx > y && xAx > x) {
          let katwaristera = [];

          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < ka.length; j++) {
              if (ka[j].toString() == arr[k].slice(0, 2).toString()) {
                katwaristera.push(arr[k]);
              }
            }
          }

          let nearest = katwaristera.find((x) => x.length == 3);

          if (!nearest) {
            return true;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return true;
            } else {
              return false;
            }
          } else if (parseInt(nearest.slice(1, 2)) < y) {
            return true;
          } else if (parseInt(nearest.slice(1, 2)) > y) {
            return false;
          }
        }
        if (yAx > y && ioxf < iox) {
          let katwdeksia = [];

          for (let k = 0; k < arr.length; k++) {
            for (let j = 0; j < kd.length; j++) {
              if (kd[j].toString() == arr[k].slice(0, 2).toString()) {
                katwdeksia.push(arr[k]);
              }
            }
          }

          let nearest = katwdeksia.find((x) => x.length == 3);

          if (!nearest) {
            return true;
          } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
            let q = nearest[2];
            let fc = q.color;
            if (this.color != fc) {
              return true;
            } else {
              return false;
            }
          } else if (parseInt(nearest.slice(1, 2)) < y) {
            return true;
          } else if (parseInt(nearest.slice(1, 2)) > y) {
            return false;
          }
        }
      }
    }
    if (this.name == "knight") {
      let ya = [1, 2, 3, 4, 5, 6, 7, 8];

      let ioxf = xa.indexOf(xAx);
      let ioyf = ya.indexOf(yAx);
      let iox = xa.indexOf(x);
      let ioy = ya.indexOf(y);
      if (x == xAx || y == yAx) {
        return;
      } else if (
        (x == xa[ioxf + 1] && y == ya[ioyf + 2]) ||
        (x == xa[ioxf + 2] && y == ya[ioyf + 1]) ||
        (x == xa[ioxf + 1] && y == ya[ioyf - 2]) ||
        (x == xa[ioxf - 2] && y == ya[ioyf + 1]) ||
        (x == xa[ioxf - 1] && y == ya[ioyf + 2]) ||
        (x == xa[ioxf + 2] && y == ya[ioyf - 1]) ||
        (x == xa[ioxf - 1] && y == ya[ioyf - 2]) ||
        (x == xa[ioxf - 2] && y == ya[ioyf - 1])
      ) {
        let kouti = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].slice(0, 2).toString() == [x, y].toString()) {
            kouti.push(arr[i]);
          }
        }
        if (kouti[0].length > 2) {
          let obj = kouti[0];
          let c = obj[2];
          if (c.color == this.color) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
    if (this.name == "king") {
      if (this.color == "white") {
        let willKingMove = [];
        let resultm = Piece.whiteKingPossibleMoves(arr);

        if (resultm == true) {
          endGame();
        } else if (resultm.length > 0) {
          for (let i = 0; i < resultm.length; i++) {
            if (resultm[i].slice(0, 2).toString() == [x, y].toString()) {
              willKingMove.push(resultm[i]);
            }
          }
          if (willKingMove.length > 0) {
            return true;
          } else {
            return false;
          }
        }
      }
      if (this.color == "black") {
        let willKingMove = [];
        let resultm = Piece.blackKingPossibleMoves(arr);

        if (resultm == true) {
          endGame();
        } else if (resultm.length > 0) {
          for (let i = 0; i < resultm.length; i++) {
            if (resultm[i].slice(0, 2).toString() == [x, y].toString()) {
              willKingMove.push(resultm[i]);
            }
          }

          if (willKingMove.length > 0) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
  }
  pawnMove(x, y) {
    let xa = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let ls = localStorage.getItem(this.spec);
    let xAx = ls.substring(ls.length - 4, ls.length - 3);
    let yAx = parseInt(ls.substring(ls.length - 2, ls.length - 1));

    if (this.name == "pawn" && this.color == "white") {
      if (
        y == yAx + 1 &&
        x != xAx &&
        (x == xa[xa.indexOf(xAx) + 1] || x == xa[xa.indexOf(xAx) - 1])
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (this.name == "pawn" && this.color == "black") {
      if (
        y == yAx - 1 &&
        x != xAx &&
        (x == xa[xa.indexOf(xAx) + 1] || x == xa[xa.indexOf(xAx) - 1])
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
  rookMove(arr, x, y) {
    let xa = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let ls = localStorage.getItem(this.spec);
    let xAx = ls.substring(ls.length - 4, ls.length - 3);
    let yAx = parseInt(ls.substring(ls.length - 2, ls.length - 1));

    let arra = [];
    let arrx = [];

    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i].slice(0, 1).toString() == xAx &&
        parseInt(arr[i].slice(1, 2)) != yAx
      ) {
        arra.push(arr[i]);
      }
    }

    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i].slice(0, 1).toString() != xAx &&
        parseInt(arr[i].slice(1, 2)) == yAx
      ) {
        arrx.push(arr[i]);
      }
    }
    let f = [...arra, ...arrx];
    let h = [];
    for (let i = 0; i < f.length; i++) {
      if (f[i].slice(0, 2).toString() == [x, y].toString()) {
        h.push(f[i]);
      }
    }
    if (h.length == 0) {
      return false;
    } else if (yAx < y && x == xAx) {
      let possibleMove = [];
      for (let l = 0; l < arra.length; l++) {
        if (
          parseInt(arra[l].slice(1, 2)) <= y &&
          parseInt(arra[l].slice(1, 2)) > yAx
        ) {
          possibleMove.push(arra[l]);
        } else {
          break;
        }
      }

      let nearest = possibleMove.find(
        (x) => x.length == 3 && x[2].name != "king"
      );

      if (!nearest) {
        return true;
      } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
        let q = nearest[2];
        let fc = q.color;
        if (this.color != fc) {
          return true;
        } else {
          return false;
        }
      } else if (parseInt(nearest.slice(1, 2)) >= y) {
        return true;
      } else {
        return false;
      }
    } else if (yAx > y && x == xAx) {
      let possibleMove = [];
      let g = arra.reverse();
      for (let b = 0; b < arra.length; b++) {
        if (
          parseInt(g[b].slice(1, 2)) >= y &&
          parseInt(g[b].slice(1, 2)) <= yAx
        ) {
          possibleMove.push(g[b]);
        } else {
          break;
        }
      }

      let nearest = possibleMove.find(
        (x) => x.length == 3 && x[2].name != "king"
      );

      if (!nearest) {
        return true;
      } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
        let q = nearest[2];
        let fc = q.color;
        if (this.color != fc) {
          return true;
        } else {
          return false;
        }
      } else if (parseInt(nearest.slice(1, 2)) < y) {
        return true;
      } else if (parseInt(nearest.slice(1, 2)) > y) {
        return false;
      }
    } else if (xa.indexOf(xAx) < xa.indexOf(x) && y == yAx) {
      let possibleMove = [];
      for (let b = 0; b < arrx.length; b++) {
        if (
          xa.indexOf(arrx[b].slice(0, 1).toString()) <=
            xa.indexOf(x.toString()) &&
          xa.indexOf(arrx[b].slice(0, 1).toString()) >=
            xa.indexOf(xAx.toString())
        ) {
          possibleMove.push(arrx[b]);
        } else {
          break;
        }
      }

      let nearest = possibleMove.find(
        (x) => x.length == 3 && x[2].name != "king"
      );
      if (!nearest) {
        return true;
      } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
        let q = nearest[2];
        let fc = q.color;
        if (this.color != fc) {
          return true;
        } else {
          return false;
        }
      } else if (
        xa.indexOf(nearest.slice(0, 1).toString()) <= xa.indexOf(y.toString())
      ) {
        return true;
      } else if (
        xa.indexOf(nearest.slice(0, 1).toString()) >= xa.indexOf(y.toString())
      ) {
        return false;
      }
    } else if (xa.indexOf(xAx) > xa.indexOf(x) && y == yAx) {
      let g = arrx.reverse();
      let possibleMove = [];
      for (let b = 0; b < arrx.length; b++) {
        if (
          xa.indexOf(g[b].slice(0, 1).toString()) >= xa.indexOf(x.toString()) &&
          xa.indexOf(g[b].slice(0, 1).toString()) <= xa.indexOf(xAx.toString())
        ) {
          possibleMove.push(g[b]);
        } else {
          break;
        }
      }
      let nearest = possibleMove.find(
        (x) => x.length == 3 && x[2].name != "king"
      );
      if (!nearest) {
        return true;
      } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
        let q = nearest[2];
        let fc = q.color;
        if (this.color != fc) {
          return true;
        } else {
          return false;
        }
      } else if (
        xa.indexOf(nearest.slice(0, 1).toString()) <= xa.indexOf(y.toString())
      ) {
        return true;
      } else if (
        xa.indexOf(nearest.slice(0, 1).toString()) >= xa.indexOf(y.toString())
      ) {
        return false;
      }
    }
  }
  bishopMove(arr, x, y) {
    let xa = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let ls = localStorage.getItem(this.spec);
    let xAx = ls.substring(ls.length - 4, ls.length - 3);
    let yAx = parseInt(ls.substring(ls.length - 2, ls.length - 1));

    if (y != yAx && x != xAx && [x, y].toString() != [xAx, yAx].toString()) {
      let ya = [1, 2, 3, 4, 5, 6, 7, 8];
      let ioxf = xa.indexOf(xAx);
      let ioyf = ya.indexOf(yAx);
      let iox = xa.indexOf(x);
      let ioy = ya.indexOf(y);
      let pd = [];
      let pa = [];
      let ka = [];
      let kd = [];

      firstloop: for (let i = ioyf; i < ya.length; i++) {
        for (let j = ioxf + 1; j < xa.length; j++) {
          if (xa.indexOf(xa[j]) <= 7 && ya.indexOf(xa[i++]) <= 7) {
            pd.push([xa[j], ya[i]]);

            if (xa[j] == "H" || ya[i] == 8) {
              break firstloop;
            }
          }
        }
      }

      secondloop: for (let i = ioyf + 1; i <= ya.length + 1; i++) {
        for (let j = ioxf - 1; j >= 0; j--) {
          // if(xa.indexOf(xa[j])>=0 && ya[i]<=7){
          pa.push([xa[j], ya[i++]]);
          if (xa[j] == "A" || ya[i - 1] == 8) {
            break secondloop;
          }
          // }
        }
      }

      thirdloop: for (let i = ioyf - 1; i >= 0; i--) {
        for (let j = ioxf - 1; j >= 0; j--) {
          if (xa.indexOf(xa[j]) >= 0 && ya[i] >= 0) {
            ka.push([xa[j], ya[i--]]);
            if (xa[j] == "A" || ya[i] == 0) {
              break thirdloop;
            }
          }
        }
      }

      fourthloop: for (let i = ioyf - 1; i >= 0; i--) {
        for (let j = ioxf + 1; j < xa.length; j++) {
          if (xa.indexOf(xa[j]) <= 7 && ya[i] >= 0) {
            kd.push([xa[j], ya[i--]]);
            if (xa[j] == "H" || ya[i] == 0) {
              break fourthloop;
            }
          }
        }
      }

      let testArr = [...pd, ...kd, ...ka, ...pa];
      let test = [];

      for (let i = 0; i < testArr.length; i++) {
        if (testArr[i].toString() == [x, y].toString()) {
          test.push(testArr[i]);
        }
      }

      if (test.length == 0) {
        return false;
      }
      if (ioyf < ioy && ioxf < iox) {
        let panwdeksia = [];
        for (let k = 0; k < arr.length; k++) {
          for (let j = 0; j < pd.length; j++) {
            if (pd[j].toString() == arr[k].slice(0, 2).toString()) {
              panwdeksia.push(arr[k]);
            }
          }
        }

        let nearest = panwdeksia.find((x) => x.length == 3);

        if (!nearest) {
          return true;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color != fc) {
            return true;
          } else {
            return false;
          }
        } else if (parseInt(nearest.slice(1, 2)) > y) {
          return true;
        } else if (parseInt(nearest.slice(1, 2)) < y) {
          return false;
        } else {
        }
      }
      if (yAx < y && iox < ioxf) {
        let panwaristera = [];
        for (let k = 0; k < arr.length; k++) {
          for (let j = 0; j < pa.length; j++) {
            if (pa[j].toString() == arr[k].slice(0, 2).toString()) {
              panwaristera.push(arr[k]);
            }
          }
        }

        let nearest = panwaristera.find(
          (x) => x.length == 3 && x[2].name != "king"
        );

        if (!nearest) {
          return true;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color != fc) {
            return true;
          } else {
            return false;
          }
        } else if (parseInt(nearest.slice(1, 2)) > y) {
          return true;
        } else if (parseInt(nearest.slice(1, 2)) < y) {
          return false;
        }
      }
      if (yAx > y && xAx > x) {
        let katwaristera = [];

        for (let k = 0; k < arr.length; k++) {
          for (let j = 0; j < ka.length; j++) {
            if (ka[j].toString() == arr[k].slice(0, 2).toString()) {
              katwaristera.push(arr[k]);
            }
          }
        }

        let nearest = katwaristera.find(
          (x) => x.length == 3 && x[2].name != "king"
        );

        if (!nearest) {
          return true;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color != fc) {
            return true;
          } else {
            return false;
          }
        } else if (parseInt(nearest.slice(1, 2)) < y) {
          return true;
        } else if (parseInt(nearest.slice(1, 2)) > y) {
          return false;
        }
      }
      if (yAx > y && ioxf < iox) {
        let katwdeksia = [];

        for (let k = 0; k < arr.length; k++) {
          for (let j = 0; j < kd.length; j++) {
            if (kd[j].toString() == arr[k].slice(0, 2).toString()) {
              katwdeksia.push(arr[k]);
            }
          }
        }

        let nearest = katwdeksia.find(
          (x) => x.length == 3 && x[2].name != "king"
        );

        if (!nearest) {
          return true;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color != fc) {
            return true;
          } else {
            return false;
          }
        } else if (parseInt(nearest.slice(1, 2)) < y) {
          return true;
        } else if (parseInt(nearest.slice(1, 2)) > y) {
          return false;
        }
      }
    }
  }
  queenMove(arr, x, y) {
    let xa = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let ls = localStorage.getItem(this.spec);
    let xAx = ls.substring(ls.length - 4, ls.length - 3);
    let yAx = parseInt(ls.substring(ls.length - 2, ls.length - 1));
    let arra = [];
    let arrx = [];
    

    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i].slice(0, 1).toString() == xAx &&
        arr[i].slice(1, 2).toString() != yAx.toString()
      ) {
        arra.push(arr[i]);
      }
    }

    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i].slice(0, 1).toString() != xAx &&
        arr[i].slice(1, 2).toString() == yAx.toString()
      ) {
        arrx.push(arr[i]);
      }
    }

    if ((y == yAx && x != xAx) || (y != yAx && x == xAx)) {
      if (yAx < y && x == xAx) {
        let possibleMove = [];
        for (let b = 0; b < arra.length; b++) {
          let bbb = [];
          bbb.push(arra[b]);

          for (let l = 0; l < bbb.length; l++) {
            if (parseInt(bbb[l].slice(1, 2)) <= y) {
              possibleMove.push(bbb[l]);
            } else {
              break;
            }
          }
        }
        let nearest = possibleMove.find((x) => x.length == 3);
        if (!nearest) {
          return true;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color != fc) {
            return true;
          } else {
            return false;
          }
        } else if (parseInt(nearest.slice(1, 2)) >= y) {
          return true;
        } else {
          return false;
        }
      }
      if (yAx > y && x == xAx) {
        let possibleMove = [];
        let g = arra.reverse();
        for (let b = 0; b < arra.length; b++) {
          if (parseInt(g[b].slice(1, 2)) >= y) {
            possibleMove.push(g[b]);
          } else {
            break;
          }
        }

        let nearest = possibleMove.find((x) => x.length == 3);

        if (!nearest) {
          return true;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color != fc) {
            return true;
          } else {
            return false;
          }
        } else if (parseInt(nearest.slice(1, 2)) < y) {
          return true;
        } else if (parseInt(nearest.slice(1, 2)) > y) {
          return false;
        }
      }

      if (xa.indexOf(xAx) < xa.indexOf(x)) {
        let possibleMove = [];
        for (let b = 0; b < arrx.length; b++) {
          if (
            xa.indexOf(arrx[b].slice(0, 1).toString()) <=
              xa.indexOf(x.toString()) &&
            xa.indexOf(arrx[b].slice(0, 1).toString()) >=
              xa.indexOf(x.toString())
          ) {
            possibleMove.push(arrx[b]);
          } else {
            break;
          }
        }
        let nearest = possibleMove.find((x) => x.length == 3);
        if (!nearest) {
          return true;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color != fc) {
            return true;
          } else {
            return false;
          }
        } else if (
          xa.indexOf(nearest.slice(0, 1).toString()) >= xa.indexOf(y.toString())
        ) {
          return true;
        } else if (
          xa.indexOf(nearest.slice(0, 1).toString()) <= xa.indexOf(y.toString())
        ) {
          return false;
        }
      }

      if (xa.indexOf(xAx) > xa.indexOf(x)) {
        let g = arrx.reverse();
        let possibleMove = [];
        for (let b = 0; b < arrx.length; b++) {
          if (
            xa.indexOf(g[b].slice(0, 1).toString()) >=
              xa.indexOf(x.toString()) &&
            xa.indexOf(g[b].slice(0, 1).toString()) <=
              xa.indexOf(xAx.toString())
          ) {
            possibleMove.push(g[b]);
          } else {
            break;
          }
        }
        let nearest = possibleMove.find((x) => x.length == 3);
        if (!nearest) {
          return true;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color != fc) {
            return true;
          } else {
            return false;
          }
        } else if (
          xa.indexOf(nearest.slice(0, 1).toString()) <= xa.indexOf(y.toString())
        ) {
          return true;
        } else if (
          xa.indexOf(nearest.slice(0, 1).toString()) >= xa.indexOf(y.toString())
        ) {
          return false;
        }
      }
    } else if (
      y != yAx &&
      x != xAx &&
      [x, y].toString() != [xAx, yAx].toString()
    ) {
      let ya = [1, 2, 3, 4, 5, 6, 7, 8];
      let ioxf = xa.indexOf(xAx);
      let ioyf = ya.indexOf(yAx);
      let iox = xa.indexOf(x);
      let ioy = ya.indexOf(y);
      let pd = [];
      let pa = [];
      let ka = [];
      let kd = [];

      firstloop: for (let i = ioyf; i < ya.length; i++) {
        for (let j = ioxf + 1; j < xa.length; j++) {
          if (xa.indexOf(xa[j]) <= 7 && ya.indexOf(xa[i++]) <= 7) {
            pd.push([xa[j], ya[i]]);

            if (xa[j] == "H" || ya[i] == 8) {
              break firstloop;
            }
          }
        }
      }

      secondloop: for (let i = ioyf + 1; i <= ya.length + 1; i++) {
        for (let j = ioxf - 1; j >= 0; j--) {
          // if(xa.indexOf(xa[j])>=0 && ya[i]<=7){
          pa.push([xa[j], ya[i++]]);
          if (xa[j] == "A" || ya[i - 1] == 8) {
            break secondloop;
          }
          // }
        }
      }

      thirdloop: for (let i = ioyf - 1; i >= 0; i--) {
        for (let j = ioxf - 1; j >= 0; j--) {
          if (xa.indexOf(xa[j]) >= 0 && ya[i] >= 0) {
            ka.push([xa[j], ya[i--]]);
            if (xa[j] == "A" || ya[i] == 0) {
              break thirdloop;
            }
          }
        }
      }

      fourthloop: for (let i = ioyf - 1; i >= 0; i--) {
        for (let j = ioxf + 1; j < xa.length; j++) {
          if (xa.indexOf(xa[j]) <= 7 && ya[i] >= 0) {
            kd.push([xa[j], ya[i--]]);
            if (xa[j] == "H" || ya[i] == 0) {
              break fourthloop;
            }
          }
        }
      }

      let testArr = [...pd, ...kd, ...ka, ...pa];
      let test = [];

      for (let i = 0; i < testArr.length; i++) {
        if (testArr[i].toString() == [x, y].toString()) {
          test.push(testArr[i]);
        }
      }

      if (test.length == 0) {
        return false;
      }
      if (ioyf < ioy && ioxf < iox) {
        let panwdeksia = [];
        for (let k = 0; k < arr.length; k++) {
          for (let j = 0; j < pd.length; j++) {
            if (pd[j].toString() == arr[k].slice(0, 2).toString()) {
              panwdeksia.push(arr[k]);
            }
          }
        }

        let nearest = panwdeksia.find((x) => x.length == 3);

        if (!nearest) {
          return true;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color != fc) {
            return true;
          } else {
            return false;
          }
        } else if (parseInt(nearest.slice(1, 2)) > y) {
          return true;
        } else if (parseInt(nearest.slice(1, 2)) < y) {
          return false;
        } else {
        }
      }
      if (yAx < y && iox < ioxf) {
        let panwaristera = [];
        for (let k = 0; k < arr.length; k++) {
          for (let j = 0; j < pa.length; j++) {
            if (pa[j].toString() == arr[k].slice(0, 2).toString()) {
              panwaristera.push(arr[k]);
            }
          }
        }

        let nearest = panwaristera.find(
          (x) => x.length == 3 && x[2].name != "king"
        );

        if (!nearest) {
          return true;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color != fc) {
            return true;
          } else {
            return false;
          }
        } else if (parseInt(nearest.slice(1, 2)) > y) {
          return true;
        } else if (parseInt(nearest.slice(1, 2)) < y) {
          return false;
        }
      }
      if (yAx > y && xAx > x) {
        let katwaristera = [];

        for (let k = 0; k < arr.length; k++) {
          for (let j = 0; j < ka.length; j++) {
            if (ka[j].toString() == arr[k].slice(0, 2).toString()) {
              katwaristera.push(arr[k]);
            }
          }
        }

        let nearest = katwaristera.find(
          (x) => x.length == 3 && x[2].name != "king"
        );

        if (!nearest) {
          return true;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color != fc) {
            return true;
          } else {
            return false;
          }
        } else if (parseInt(nearest.slice(1, 2)) < y) {
          return true;
        } else if (parseInt(nearest.slice(1, 2)) > y) {
          return false;
        }
      }
      if (yAx > y && ioxf < iox) {
        let katwdeksia = [];

        for (let k = 0; k < arr.length; k++) {
          for (let j = 0; j < kd.length; j++) {
            if (kd[j].toString() == arr[k].slice(0, 2).toString()) {
              katwdeksia.push(arr[k]);
            }
          }
        }

        let nearest = katwdeksia.find(
          (x) => x.length == 3 && x[2].name != "king"
        );

        if (!nearest) {
          return true;
        } else if (nearest.slice(0, 2).toString() == [x, y].toString()) {
          let q = nearest[2];
          let fc = q.color;
          if (this.color != fc) {
            return true;
          } else {
            return false;
          }
        } else if (parseInt(nearest.slice(1, 2)) < y) {
          return true;
        } else if (parseInt(nearest.slice(1, 2)) > y) {
          return false;
        }
      }
    }
  }
  knightMove(x, y) {
    let xa = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let ls = localStorage.getItem(this.spec);
    let xAx = ls.substring(ls.length - 4, ls.length - 3);
    let yAx = parseInt(ls.substring(ls.length - 2, ls.length - 1));
    let ya = [1, 2, 3, 4, 5, 6, 7, 8];
    let ioxf = xa.indexOf(xAx);
    let ioyf = ya.indexOf(yAx);
    let iox = xa.indexOf(x);
    let ioy = ya.indexOf(y);
    let possibleMoves = [];
    let possibleMove = [
      [ioxf + 1, ioyf + 2],
      [ioxf + 2, ioyf + 1],
      [ioxf - 1, ioyf + 2],
      [ioxf - 2, ioyf + 1],
      [ioxf - 1, ioyf - 2],
      [ioxf - 2, ioyf - 1],
      [ioxf + 1, ioyf - 2],
      [ioxf + 2, ioyf - 1],
    ];
    for (let i = 0; i < possibleMove.length; i++) {
      if (possibleMove[i][0] >= 0 && possibleMove[i][1] >= 0) {
        possibleMoves.push(possibleMove[i]);
      }
    }
    let test = [];
    for (let i = 0; i < possibleMoves.length; i++) {
      if (possibleMoves[i].toString() == [iox, ioy].toString()) {
        test.push(possibleMoves[i]);
      }
    }
    if (test.length == 0) {
      return false;
    } else {
      return true;
    }
  }
}

let pawn1 = new Piece("black", "pawn", "pawn1");
let pawn2 = new Piece("black", "pawn", "pawn2");
let pawn3 = new Piece("black", "pawn", "pawn3");
let pawn4 = new Piece("black", "pawn", "pawn4");
let pawn5 = new Piece("black", "pawn", "pawn5");
let pawn6 = new Piece("black", "pawn", "pawn6");
let pawn7 = new Piece("black", "pawn", "pawn7");
let pawn8 = new Piece("black", "pawn", "pawn8");
let pawn9 = new Piece("white", "pawn", "pawn9");
let pawn10 = new Piece("white", "pawn", "pawn10");
let pawn11 = new Piece("white", "pawn", "pawn11");
let pawn12 = new Piece("white", "pawn", "pawn12");
let pawn13 = new Piece("white", "pawn", "pawn13");
let pawn14 = new Piece("white", "pawn", "pawn14");
let pawn15 = new Piece("white", "pawn", "pawn15");
let pawn16 = new Piece("white", "pawn", "pawn16");

const queenWhite = new Piece("white", "queen", "queenWhite");
const kingWhite = new Piece("white", "king", "kingWhite");
const knight1White = new Piece("white", "knight", "knight1White");
const rook1White = new Piece("white", "rook", "rook1White");
const bishop1White = new Piece("white", "bishop", "bishop1White");
const knight2White = new Piece("white", "knight", "knight2White");
const rook2White = new Piece("white", "rook", "rook2White");
const bishop2White = new Piece("white", "bishop", "bishop2White");

const queenBlack = new Piece("black", "queen", "queenBlack");
const kingBlack = new Piece("black", "king", "kingBlack");
const knight1Black = new Piece("black", "knight", "knight1Black");
const rook1Black = new Piece("black", "rook", "rook1Black");
const bishop1Black = new Piece("black", "bishop", "bishop1Black");
const knight2Black = new Piece("black", "knight", "knight2Black");
const rook2Black = new Piece("black", "rook", "rook2Black");
const bishop2Black = new Piece("black", "bishop", "bishop2Black");



function startGame() {
  let board = [];
  for (let i = 0; i < x.length; i++) {
    for (let j = 0; j <= y.length - 1; j++) {
      if (x[i] == "A" && y[j] == 2) {
        board.push([x[i], y[j], pawn9]);
        localStorage.setItem("pawn9", JSON.stringify("pawn9" + [x[i], y[j]]));
      } else if (x[i] == "B" && y[j] == 2) {
        board.push([x[i], y[j], pawn10]);
        localStorage.setItem("pawn10", JSON.stringify("pawn10" + [x[i], y[j]]));
      } else if (x[i] == "C" && y[j] == 2) {
        board.push([x[i], y[j], pawn11]);
        localStorage.setItem("pawn11", JSON.stringify("pawn11" + [x[i], y[j]]));
      } else if (x[i] == "D" && y[j] == 2) {
        board.push([x[i], y[j], pawn12]);
        localStorage.setItem("pawn12", JSON.stringify("pawn12" + [x[i], y[j]]));
      } else if (x[i] == "E" && y[j] == 2) {
        board.push([x[i], y[j], pawn13]);
        localStorage.setItem("pawn13", JSON.stringify("pawn13" + [x[i], y[j]]));
      } else if (x[i] == "F" && y[j] == 2) {
        board.push([x[i], y[j], pawn14]);
        localStorage.setItem("pawn14", JSON.stringify("pawn14" + [x[i], y[j]]));
      } else if (x[i] == "G" && y[j] == 2) {
        board.push([x[i], y[j], pawn15]);
        localStorage.setItem("pawn15", JSON.stringify("pawn15" + [x[i], y[j]]));
      } else if (x[i] == "H" && y[j] == 2) {
        board.push([x[i], y[j], pawn16]);
        localStorage.setItem("pawn16", JSON.stringify("pawn16" + [x[i], y[j]]));
      } else if (x[i] == "A" && y[j] == 7) {
        board.push([x[i], y[j], pawn1]);
        localStorage.setItem("pawn1", JSON.stringify("pawn1" + [x[i], y[j]]));
      } else if (x[i] == "B" && y[j] == 7) {
        board.push([x[i], y[j], pawn2]);
        localStorage.setItem("pawn2", JSON.stringify("pawn2" + [x[i], y[j]]));
      } else if (x[i] == "C" && y[j] == 7) {
        board.push([x[i], y[j], pawn3]);
        localStorage.setItem("pawn3", JSON.stringify("pawn3" + [x[i], y[j]]));
      } else if (x[i] == "D" && y[j] == 7) {
        board.push([x[i], y[j], pawn4]);
        localStorage.setItem("pawn4", JSON.stringify("pawn4" + [x[i], y[j]]));
      } else if (x[i] == "E" && y[j] == 7) {
        board.push([x[i], y[j], pawn5]);
        localStorage.setItem("pawn5", JSON.stringify("pawn5" + [x[i], y[j]]));
      } else if (x[i] == "F" && y[j] == 7) {
        board.push([x[i], y[j], pawn6]);
        localStorage.setItem("pawn6", JSON.stringify("pawn6" + [x[i], y[j]]));
      } else if (x[i] == "G" && y[j] == 7) {
        board.push([x[i], y[j], pawn7]);
        localStorage.setItem("pawn7", JSON.stringify("pawn7" + [x[i], y[j]]));
      } else if (x[i] == "H" && y[j] == 7) {
        board.push([x[i], y[j], pawn8]);
        localStorage.setItem("pawn8", JSON.stringify("pawn8" + [x[i], y[j]]));
      } else if (x[i] == "A" && y[j] == 1) {
        board.push([x[i], y[j], rook1White]);
        localStorage.setItem(
          "rook1White",
          JSON.stringify("rook1White" + [x[i], y[j]])
        );
      } else if (x[i] == "B" && y[j] == 1) {
        board.push([x[i], y[j], knight1White]);
        localStorage.setItem(
          "knight1White",
          JSON.stringify("knight1White" + [x[i], y[j]])
        );
      } else if (x[i] == "C" && y[j] == 1) {
        board.push([x[i], y[j], bishop1White]);
        localStorage.setItem(
          "bishop1White",
          JSON.stringify("bishop1White" + [x[i], y[j]])
        );
      } else if (x[i] == "D" && y[j] == 1) {
        board.push([x[i], y[j], kingWhite]);
        localStorage.setItem(
          "kingWhite",
          JSON.stringify("kingWhite" + [x[i], y[j]])
        );
      } else if (x[i] == "E" && y[j] == 1) {
        board.push([x[i], y[j], queenWhite]);
        localStorage.setItem(
          "queenWhite",
          JSON.stringify("queenWhite" + [x[i], y[j]])
        );
      } else if (x[i] == "F" && y[j] == 1) {
        board.push([x[i], y[j], bishop2White]);
        localStorage.setItem(
          "bishop2White",
          JSON.stringify("bishop2White" + [x[i], y[j]])
        );
      } else if (x[i] == "G" && y[j] == 1) {
        board.push([x[i], y[j], knight2White]);
        localStorage.setItem(
          "knight2White",
          JSON.stringify("knight2White" + [x[i], y[j]])
        );
      } else if (x[i] == "H" && y[j] == 1) {
        board.push([x[i], y[j], rook2White]);
        localStorage.setItem(
          "rook2White",
          JSON.stringify("rook2White" + [x[i], y[j]])
        );
      } else if (x[i] == "A" && y[j] == 8) {
        board.push([x[i], y[j], rook1Black]);
        localStorage.setItem(
          "rook1Black",
          JSON.stringify("rook1Black" + [x[i], y[j]])
        );
      } else if (x[i] == "B" && y[j] == 8) {
        board.push([x[i], y[j], knight1Black]);
        localStorage.setItem(
          "knight1Black",
          JSON.stringify("knight1Black" + [x[i], y[j]])
        );
      } else if (x[i] == "C" && y[j] == 8) {
        board.push([x[i], y[j], bishop1Black]);
        localStorage.setItem(
          "bishop1Black",
          JSON.stringify("bishop1Black" + [x[i], y[j]])
        );
      } else if (x[i] == "D" && y[j] == 8) {
        board.push([x[i], y[j], kingBlack]);
        localStorage.setItem(
          "kingBlack",
          JSON.stringify("kingBlack" + [x[i], y[j]])
        );
      } else if (x[i] == "E" && y[j] == 8) {
        board.push([x[i], y[j], queenBlack]);
        localStorage.setItem(
          "queenBlack",
          JSON.stringify("queenBlack" + [x[i], y[j]])
        );
      } else if (x[i] == "F" && y[j] == 8) {
        board.push([x[i], y[j], bishop2Black]);
        localStorage.setItem(
          "bishop2Black",
          JSON.stringify("bishop2Black" + [x[i], y[j]])
        );
      } else if (x[i] == "G" && y[j] == 8) {
        board.push([x[i], y[j], knight2Black]);
        localStorage.setItem(
          "knight2Black",
          JSON.stringify("knight2Black" + [x[i], y[j]])
        );
      } else if (x[i] == "H" && y[j] == 8) {
        board.push([x[i], y[j], rook2Black]);
        localStorage.setItem(
          "rook2Black",
          JSON.stringify("rook2Black" + [x[i], y[j]])
        );
      } else {
        board.push([x[i], y[j]]);
      }
    }
  }
  localStorage.setItem("board", JSON.stringify(board));
  return board;
}

function fBoard(piece, chars, nums) {
  let obj = Object.values(piece);
  let spec = obj[2];
  let ls = localStorage.getItem(spec);
  let coor = ls.substring(ls.length - 4, ls.length - 1);

  let itemsArray = localStorage.getItem("board")
    ? JSON.parse(localStorage.getItem("board"))
    : [];

  if (itemsArray.length == 0) {
    startGame();
  }

  if (piece.move(itemsArray, chars, nums)) {
    for (let i = 0; i < itemsArray.length; i++) {
      if (
        itemsArray[i].slice(0, 2).toString() == [chars, nums].toString() &&
        itemsArray[i].length < 3
      ) {
        itemsArray[i].push(piece);
        piece.ax = itemsArray[i].slice(0, 2);
        localStorage.setItem(
          spec,
          JSON.stringify(piece.color + spec + [chars, nums])
        );
        for (let j = 0; j < itemsArray.length; j++) {
          if (itemsArray[j].slice(0, 2).toString() == coor) {
            itemsArray[j].pop();
            localStorage.setItem("board", JSON.stringify(itemsArray));
            return itemsArray;
          }
        }
      } else if (
        itemsArray[i].slice(0, 2).toString() == [chars, nums].toString() &&
        itemsArray[i].length == 3
      ) {
        itemsArray[i].pop();
        itemsArray[i].push(piece);
        piece.ax = itemsArray[i].slice(0, 2);
        localStorage.setItem(
          spec,
          JSON.stringify(piece.color + spec + [chars, nums])
        );
        for (let j = 0; j < itemsArray.length; j++) {
          if (itemsArray[j].slice(0, 2).toString() == coor) {
            let g = itemsArray[j];
            itemsArray[j].pop();
            localStorage.setItem("board", JSON.stringify(itemsArray));
            return itemsArray;
          }
        }
      }
    }
  } else {
    return false;
  }

  return itemsArray;
}

function aBoard(piece, chars, nums) {
  let obj = Object.values(piece);
  let spec = obj[2];
  let ls = localStorage.getItem(spec);
  let coor = ls.substring(ls.length - 4, ls.length - 1);

  let itemsArray = localStorage.getItem("board")
    ? JSON.parse(localStorage.getItem("board"))
    : [];

  if (itemsArray.length == 0) {
    startGame();
  }

  if (piece.move(itemsArray, chars, nums)) {
    for (let i = 0; i < itemsArray.length; i++) {
      if (
        itemsArray[i].slice(0, 2).toString() == [chars, nums].toString() &&
        itemsArray[i].length < 3
      ) {
        itemsArray[i].push(piece);
        piece.ax = itemsArray[i].slice(0, 2);

        for (let j = 0; j < itemsArray.length; j++) {
          if (itemsArray[j].slice(0, 2).toString() == coor) {
            itemsArray[j].pop();

            return itemsArray;
          }
        }
      } else if (
        itemsArray[i].slice(0, 2).toString() == [chars, nums].toString() &&
        itemsArray[i].length == 3
      ) {
        itemsArray[i].pop();
        itemsArray[i].push(piece);
        piece.ax = itemsArray[i].slice(0, 2);
        for (let j = 0; j < itemsArray.length; j++) {
          if (itemsArray[j].slice(0, 2).toString() == coor) {
            itemsArray[j].pop();
            return itemsArray;
          }
        }
      }
    }
  } else {
    return false;
  }

  return itemsArray;
}

function endGame() {
 
  localStorage.clear();
  setTimeout(() => {
    document.location.reload();
  }, 0);
}

document.addEventListener("DOMContentLoaded", () => {
  let firstClickTarget = null;
  let board = localStorage.getItem("board")
    ? JSON.parse(localStorage.getItem("board"))
    : [];
  let turns = localStorage.getItem("turns")
    ? parseInt(localStorage.getItem("turns"))
    : 1;

  const u = document.querySelectorAll("button,img");
  Array.from(u).forEach((button) =>
    button.addEventListener("click", (event) => {
      let pieces = [
        queenBlack,
        kingBlack,
        knight1Black,
        rook1Black,
        bishop1Black,
        knight2Black,
        rook2Black,
        bishop2Black,
        pawn1,
        pawn2,
        pawn3,
        pawn4,
        pawn5,
        pawn6,
        pawn7,
        pawn8,
        queenWhite,
        kingWhite,
        knight1White,
        rook1White,
        bishop1White,
        knight2White,
        rook2White,
        bishop2White,
        pawn9,
        pawn10,
        pawn11,
        pawn12,
        pawn13,
        pawn14,
        pawn15,
        pawn16,
      ];
      let newArr1 = [];
      let km = [];

      if (!firstClickTarget) {
        const button = event.target;
        const coors = [
          button.value.substring(0, 1),
          button.value.substring(1, 2),
        ];

        if (board.length == 0) {
          board = startGame();
          setTimeout(() => {
            document.location.reload();
          }, 0);
        }
        for (let i = 0; i < board.length; i++) {
          if (board[i].slice(0, 2).toString() == coors.toString()) {
            let o = board[i];
            if (o.length < 3) {
            } else if (turns % 2 == 0 && o[2].color == "white") {
            } else if (turns % 2 != 0 && o[2].color == "black") {
            } else {
              for (let f = 0; f < pieces.length; f++) {
                if (o[2].spec == pieces[f].spec) {
                  firstClickTarget = pieces[f];
                  return;
                }
              }
            }
          }
        }
      } else if (firstClickTarget) {
        const button = event.target;
        if (!button.value) {
          return;
        }

        const moveResult = aBoard(
          firstClickTarget,
          button.value.substring(0, 1),
          parseInt(button.value.substring(1, 2))
        );

        if (!moveResult) {
          return;
        }
        console.log("Move result: ", moveResult);
        let blackking;
        let whiteking;

        for (let i = 0; i < moveResult.length; i++) {
          let g = moveResult[i];

          if (g.length > 2 && g[2].spec == "kingBlack") {
            blackking = moveResult[i];
          }
          if (g.length > 2 && g[2].spec == "kingWhite") {
            whiteking = moveResult[i];
          }
        }

        let shouldWhiteKingMove = false;
        let shouldBlackKingMove = false;

        let newArr = [];
        for (let i = 0; i < moveResult.length; i++) {
          for (let j = 0; j < pieces.length; j++) {
            let g = moveResult[i];
            if (moveResult[i].length > 2 && g[2].spec == pieces[j].spec) {
              newArr.push(pieces[j]);
            }
          }
        }

        for (let i = 0; i < newArr.length; i++) {
          if (
            moveResult.length > 0 &&
            newArr[i].name != "king" &&
            newArr[i].color == "black" &&
            newArr[i].check(
              moveResult,
              whiteking.slice(0, 1).toString(),
              parseInt(whiteking.slice(1, 2))
            )
          ) {
            shouldWhiteKingMove = true;
          }
        }

        for (let i = 0; i < newArr.length; i++) {
          if (
            moveResult.length > 0 &&
            newArr[i].name != "king" &&
            newArr[i].color == "white" &&
            newArr[i].check(
              moveResult,
              blackking.slice(0, 1).toString(),
              parseInt(blackking.slice(1, 2))
            )
          ) {
            shouldBlackKingMove = true;
          }
        }

        console.log("White king in check: ", shouldWhiteKingMove);
        console.log("Black king in check: ", shouldBlackKingMove);
        

        if (turns % 2 == 0 && shouldBlackKingMove) {
          let checkCount = 0;
          
          for (let i = 0; i < moveResult.length; i++) {
            if (moveResult[i].length > 2) {
              let g = moveResult[i];
              if (g[2].color == "black" ) {
                km.push(g[2]);
              }
            }
          }
      
          for (let j = 0; j < km.length; j++) {
            for (let i = 0; i < pieces.length; i++) {
              if (km[j].spec == pieces[i].spec) {
                newArr1.push(pieces[i]);
              }
            }
          }
         
          for(let i=0;i<newArr1.length;i++){
            for(let j=0;j<moveResult.length;j++){
             const result = aBoard(newArr1[i],moveResult[j].slice(0,1),parseInt(moveResult[j].slice(1,2)));
             console.log("Result: ",result);
             if(result){
             for (let i = 0; i < newArr.length; i++) {
              if (
                result.length > 0 &&
                newArr[i].name != "king" &&
                newArr[i].color == "white" &&
                !newArr[i].check(
                  result,
                  blackking.slice(0, 1).toString(),
                  parseInt(blackking.slice(1, 2))
                )
              ) {
                checkCount++;
                console.log("Check count: ", checkCount);
              }
            
            }
            if(checkCount == 0){
              console.log("game has ended");
              return
            }else{
              console.log("game has not ended");
              return
            }
            }
          }
          }
        }

        if (turns % 2 != 0 && shouldWhiteKingMove) {
          let checkCount = 0;
          
          for (let i = 0; i < moveResult.length; i++) {
            if (moveResult[i].length > 2) {
              let g = moveResult[i];
              if (g[2].color == "white" ) {
                km.push(g[2]);
              }
            }
          }
      
          for (let j = 0; j < km.length; j++) {
            for (let i = 0; i < pieces.length; i++) {
              if (km[j].spec == pieces[i].spec) {
                newArr1.push(pieces[i]);
              }
            }
          }
         
          for(let i=0;i<newArr1.length;i++){
            for(let j=0;j<moveResult.length;j++){
             const result = aBoard(newArr1[i],moveResult[j].slice(0,1),parseInt(moveResult[j].slice(1,2)));
             console.log("Result: ",result);
             if(result){
             for (let i = 0; i < newArr.length; i++) {
              if (
                result.length > 0 &&
                newArr[i].name != "king" &&
                newArr[i].color == "black" &&
                !newArr[i].check(
                  result,
                  blackking.slice(0, 1).toString(),
                  parseInt(blackking.slice(1, 2))
                )
              ) {
                checkCount++;
                console.log("Check count: ", checkCount);
              }
            
            }
            if(checkCount == 0){
              console.log("game has ended");
              return
            }else{
              console.log("game has not ended");
              return
            }
            }
          }
          }
        }
        fBoard(
          firstClickTarget,
          button.value.substring(0, 1),
          parseInt(button.value.substring(1, 2))
        );
        localStorage.setItem("turns", turns + 1);
        // setTimeout(() => document.location.reload(), 0);
      }
    })
  );
});

document.getElementById("endGame").addEventListener("click", () => endGame());

const i = document.getElementsByTagName("button");
Array.from(i).forEach(async function (button) {
  const arrr = [button.value];

  const board = localStorage.getItem("board")
    ? JSON.parse(localStorage.getItem("board"))
    : [];
  if (!board) {
    board = startGame();
  }

  for (let i = 0; i < board.length; i++) {
    if (
      board[i].slice(0, 2).join("").toString() == arrr &&
      board[i].length > 2
    ) {
      let g = board[i];
      if (g[2].color == "black" && g[2].name == "pawn") {
        const container = document.getElementById(arrr);
        const newElement = document.createElement("img");
        newElement.value = board[i].slice(0, 2).join("").toString();
        newElement.src = "./images/blackpawn.png";
        container.appendChild(newElement);
      }
      if (g[2].color == "white" && g[2].name == "pawn") {
        const container = document.getElementById(arrr);
        const newElement = document.createElement("img");
        newElement.src = "./images/whitepawn.png";
        newElement.value = board[i].slice(0, 2).join("").toString();
        container.appendChild(newElement);
      }
      if (g[2].color == "black" && g[2].name == "king") {
        const container = document.getElementById(arrr);
        const newElement = document.createElement("img");
        newElement.value = board[i].slice(0, 2).join("").toString();
        newElement.src = "./images/blackking.png";
        container.appendChild(newElement);
      }
      if (g[2].color == "white" && g[2].name == "king") {
        const container = document.getElementById(arrr);
        const newElement = document.createElement("img");
        newElement.value = board[i].slice(0, 2).join("").toString();
        newElement.src = "./images/whiteking.png";
        container.appendChild(newElement);
      }
      if (g[2].color == "black" && g[2].name == "rook") {
        const container = document.getElementById(arrr);
        const newElement = document.createElement("img");
        newElement.value = board[i].slice(0, 2).join("").toString();
        newElement.src = "./images/blackrook.png";
        container.appendChild(newElement);
      }
      if (g[2].color == "white" && g[2].name == "rook") {
        const container = document.getElementById(arrr);
        const newElement = document.createElement("img");
        newElement.value = board[i].slice(0, 2).join("").toString();
        newElement.src = "./images/whiterook.png";
        container.appendChild(newElement);
      }
      if (g[2].color == "black" && g[2].name == "bishop") {
        const container = document.getElementById(arrr);
        const newElement = document.createElement("img");
        newElement.value = board[i].slice(0, 2).join("").toString();
        newElement.src = "./images/blackbishop.png";
        container.appendChild(newElement);
      }
      if (g[2].color == "white" && g[2].name == "bishop") {
        const container = document.getElementById(arrr);
        const newElement = document.createElement("img");
        newElement.value = board[i].slice(0, 2).join("").toString();
        newElement.src = "./images/whitebishop.png";
        container.appendChild(newElement);
      }
      if (g[2].color == "black" && g[2].name == "knight") {
        const container = document.getElementById(arrr);
        const newElement = document.createElement("img");
        newElement.value = board[i].slice(0, 2).join("").toString();
        newElement.src = "./images/blacknight.png";
        container.appendChild(newElement);
      }
      if (g[2].color == "white" && g[2].name == "knight") {
        const container = document.getElementById(arrr);
        const newElement = document.createElement("img");
        newElement.value = board[i].slice(0, 2).join("").toString();
        newElement.src = "./images/whiteknight.png";
        container.appendChild(newElement);
      }
      if (g[2].color == "black" && g[2].name == "queen") {
        const container = document.getElementById(arrr);
        const newElement = document.createElement("img");
        newElement.value = board[i].slice(0, 2).join("").toString();
        newElement.src = "./images/blackqueen.png";
        container.appendChild(newElement);
      }
      if (g[2].color == "white" && g[2].name == "queen") {
        const container = document.getElementById(arrr);
        const newElement = document.createElement("img");
        newElement.value = board[i].slice(0, 2).join("").toString();
        newElement.src = "./images/whitequeen.png";
        container.appendChild(newElement);
      }
    }
  }
});
document.getElementById("turns").innerText =
  localStorage.getItem("turns")
    ? localStorage.getItem("turns") % 2 != 0
    ? "it is whites turn"
    :  "it is black turn":"white starts "
