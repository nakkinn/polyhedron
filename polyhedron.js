let vts1 = [[1,1,1],[-1,-1,1],[1,-1,-1],[-1,1,-1]];
let face1 = [[0,1,2], [0,1,3],[0,2,3],[1,2,3]];
let vts2 = [[1,1,1],[1,-1,1],[-1,-1,1],[-1,1,1],[1,1,-1],[1,-1,-1],[-1,-1,-1],[-1,1,-1]];
let face2 = [[0,1,2,3],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]];
let vts3 = [[0,0,1],[1,0,0],[0,1,0],[-1,0,0],[0,-1,0],[0,0,-1]];
let face3 = [[0,1,2],[0,2,3],[0,3,4],[0,4,1],[5,1,2],[5,2,3],[5,3,4],[5,4,1]];
let vts4=[[-1., -1., -1.], [-1., -1., 1.], [-1., 1., -1.], [-1., 1., 1.],[1., -1., -1.], [1., -1., 1.], [1., 1., -1.], [1., 1., 1.], [1.61803,0.618034, 0.], [1.61803, -0.618034, 0.], [-1.61803, -0.618034, 0.],[-1.61803, 0.618034, 0.], [0., 1.61803, 0.618034], [0., 1.61803, -0.618034],[0., -1.61803, -0.618034], [0., -1.61803, 0.618034], [0.618034, 0., 1.61803],[-0.618034, 0., 1.61803], [-0.618034, 0., -1.61803], [0.618034, 0., -1.61803]]
let face4=[[14, 15, 1, 10, 0], [10, 11, 2, 18, 0], [18, 19, 4, 14, 0], [1, 17, 3, 11, 10], [2, 11, 3, 12, 13], [2, 13, 6, 19, 18], [1, 15, 5, 16, 17], [17, 16, 7, 12, 3], [4, 9, 5, 15, 14], [4, 19, 6, 8, 9], [9, 8, 7, 16, 5],[13, 12, 7, 8, 6]]
let vts5=[[1., 1.61803, 0.], [1., -1.61803, 0.], [-1., -1.61803, 0.], [-1., 1.61803, 0.], [0., 1., 1.61803], [0., 1., -1.61803], [0., -1., -1.61803], [0., -1., 1.61803], [1.61803, 0., 1.], [-1.61803, 0., 1.], [-1.61803, 0., -1.], [1.61803, 0., -1.]]
let face5=[[0, 3, 4], [0, 3, 5], [0, 4, 8], [0, 5, 11], [0, 8, 11], [1, 2, 6], [1, 2, 7], [1, 6, 11], [1, 7, 8], [1, 8, 11], [2, 6, 10], [2, 7, 9], [2, 9, 10], [3, 4, 9], [3, 5, 10], [3, 9, 10], [4, 7, 8], [4, 7, 9], [5, 6, 10], [5, 6, 11]]

let vts = [];
let face = [];

let r = 50;
let subcanvas;

let mode = true;
let type;
let para;
let angle = 0;
let hei = 0;


function setup(){
    createCanvas(1000,500);
    subcanvas = createGraphics(500,500,WEBGL);
    subcanvas.scale(1.6);
}

function draw(){

    background(235);

    noFill();
    stroke(0);
    circle(750, height/2, 400);
    line(705, 55, 705, 445);

    noStroke();
    fill(255,0,0);
    for(let i=0; i<7; i++)  circle(750+200*cos(PI/3.5*i), height/2+200*sin(PI/3.5*i), 10);
    circle(705, 250, 10);

    fill(0);
    if(mode)    circle(750+200*cos(angle), height/2+200*sin(angle), 10);
    else    circle(705, hei, 10);

    if(mouseIsPressed){
        if(abs(dist(750,height/2,mouseX,mouseY)-200)<5){
            mode = true;
        }else if(abs(mouseX-705)<20 && abs(mouseY-height/2)<195){
            mode = false;
        }

        if(mode){
            angle = atan2(mouseY-height/2, mouseX-750);
        }else{
            hei = constrain(mouseY,55,445);
        }
    }

    if(angle<0) angle = TAU + angle;
    if(mode){
        type = int((angle)/(PI/3.5));
        if(type==7) type=6;
        para = angle/(PI/3.5) - type;
    }else{
        if(hei<250){
            type=7;
            para = map(hei,55,250,0,1);
        }else{
            type=8;
            para = map(hei,250,445,0,1);
        }
    }

    if(type==0) settyo(vts2,face2,map(para,0,1,1,0.666),1);
    if(type==1) settyo(vts2,face2,map(para,0,1,0.666,0.5),1);
    if(type==2) mendashi(vts1,face1,map(para,0,1,3,0),map(para,0,1,0.5,1));
    if(type==3) settyo(vts1,face1,map(para,0,1,1,0.666),1);
    if(type==4) settyo(vts1,face1,map(para,0,1,0.666,0.5),map(para,0,1,1,1.1));
    if(type==5) mendashi(vts3,face3,map(para,0,1,0,2),map(para,0,1,sqrt(2)*0.94,0.5*sqrt(2)));
    if(type==6) mendashi(vts2,face2,map(para,0,1,sqrt(2),0),map(para,0,1,0.48,1));
    if(type==7) settyo(vts3,face3,map(para,0,1,1,0.666),map(para,0,1,1.1,1.2));
    if(type==8) settyo(vts3,face3,map(para,0,1,0.666,0.5),map(para,0,1,1.2,1.26));

    subcanvas.clear();
    subcanvas.background(255);

    subcanvas.rotateY(0.004);

    subcanvas.noFill();
    subcanvas.stroke(0);
    for(let i=0; i<face.length; i++){
        subcanvas.beginShape();
        for(let j=0; j<face[i].length; j++) subcanvas.vertex(r*vts[face[i][j]][0], r*vts[face[i][j]][1], r*vts[face[i][j]][2]);
        subcanvas.endShape(CLOSE);
    }
    
    image(subcanvas,0,0);
}


function mendashi(v, f, t, sc){

    vts = [];
    face = [];

    let m =0, tem;
    let list1 = [];
    let list2 = [];
    let edge = [];
    let list3 = new Array(v.length);

    for(let i=0; i<f.length; i++){
        tem = [];
        for(let j=0; j<f[i].length; j++){
            vts.push([v[f[i][j]][0], v[f[i][j]][1], v[f[i][j]][2]]);
            list1.push(f[i][j]);
            list2.push(i);
            tem.push(m);
            m++;
        }
        face.push(tem);
    }
    
    for(let i=0; i<list3.length; i++)   list3[i] = [];
    for(let i=0; i<f.length; i++)   for(let j=0; j<f[i].length; j++){
        if(list3[f[i][j]].indexOf(f[i][(j+1)%f[i].length])==-1) list3[f[i][j]].push(f[i][(j+1)%f[i].length]);
        if(list3[f[i][(j+1)%f[i].length]].indexOf(f[i][j])==-1)  list3[f[i][(j+1)%f[i].length]].push(f[i][j]);
    }
    
    for(let i=0; i<list3.length; i++)   for(let j=0; j<list3[i].length; j++){
        if(i<list3[i][j])   edge.push([i,list3[i][j]]);
    }

    let g;
    for(let i=0; i<face.length; i++){
        g = [0,0,0];
        for(let j=0; j<face[i].length; j++){
            g[0] += vts[face[i][j]][0] / face[i].length;
            g[1] += vts[face[i][j]][1] / face[i].length;
            g[2] += vts[face[i][j]][2] / face[i].length;
        }
        for(let j=0; j<face[i].length; j++){
            vts[face[i][j]][0] += t*g[0];
            vts[face[i][j]][1] += t*g[1];
            vts[face[i][j]][2] += t*g[2];
        }
    }
    
    for(let i=0; i<v.length; i++){
        tem = [];
        for(let j=0; j<list1.length; j++){
            if(list1[j]==i) tem.push(j);
        }
        
        if(tem.length>3){
            let used = new Array(tem.length);
            for(let j=0; j<used.length; j++)    used[j] = false;
            used[0] = true;
            let tem2 = [];
            tem2[0] = tem[0];
            for(let j=0; j<tem.length-1; j++){
                for(let k=0; k<tem.length; k++){
                    if(!used[k]){
                        if(neiface(list2[tem2[tem2.length-1]], list2[tem[k]])){
                            tem2.push(tem[k]);
                            used[k] = true;
                            break;
                        }
                    }
                }
            }
            face.push(tem2);
        }else{
            face.push(tem);
        }
        
    }

    for(let i=0; i<vts.length; i++) for(let j=0; j<3; j++)  vts[i][j]*=sc;


    function neiface(f1,f2){
        let a = f[f1];
        let b = f[f2];

        let c=0;
        for(let i=0; i<a.length; i++){
            if(a.indexOf(b[i]) != -1)   c++;
        }

        if(c==2)    return true;
        else    return false;
    }
    
}

function settyo(v, f, t, sc){

    vts = [];
    face = [];

    let list1 = new Array(v.length);
    for(let i=0; i<list1.length; i++)    list1[i] = [];
    let list2 = new Array(v.length);
    for(let i=0; i<list2.length; i++)    list2[i] = [];

    for(let i=0; i<f.length; i++)   for(let j=0; j<f[i].length; j++){
        if(list1[f[i][j]].indexOf(f[i][(j+1)%f[i].length])==-1) list1[f[i][j]].push(f[i][(j+1)%f[i].length]);
        if(list1[f[i][(j+1)%f[i].length]].indexOf(f[i][j])==-1)  list1[f[i][(j+1)%f[i].length]].push(f[i][j]);
    }

    for(let i=0; i<list1.length; i++)    for(let j=0; j<list1[i].length; j++){
        list2[i][j] = naibun(i,list1[i][j], t);
    }

    let m=0,tem;
    for(let i=0; i<list2.length; i++){
        tem = [];
        for(let j=0; j<list2[i].length; j++){
            vts.push(list2[i][j]);
            tem.push(m);
            m++;
        }
        //face.push(tem);
    }
    
    for(let i=0; i<f.length; i++){
        tem = [];
        for(let j=0; j<f[i].length; j++){
            vts.push( list2[ f[i][j] ][ list1[f[i][j]].indexOf(f[i][(j+f[i].length-1)%f[i].length]) ]);
            vts.push( list2[ f[i][j] ][ list1[f[i][j]].indexOf(f[i][(j+1)%f[i].length]) ]);
            tem.push(m);
            tem.push(m+1);
            m+=2;
        }
        face.push(tem);
    }

    for(let i=0; i<vts.length; i++) for(let j=0; j<3; j++)  vts[i][j]*=sc;

    function naibun(v1, v2, t){
        return [v[v1][0]*t+v[v2][0]*(1-t), v[v1][1]*t+v[v2][1]*(1-t), v[v1][2]*t+v[v2][2]*(1-t)];
    }

}