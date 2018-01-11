$(function () {
    let b = $('.qipan'),flag = true;
    let hei={},bai={},blank={},ai = true;
    let c = $('.ban');
    let a = c[0],d = c[1];
    for ( let i = 0 ; i < 15 ; i++){
        $('<i>').appendTo(b);
        $('<b>').appendTo(b);
        for(let j = 0; j<15;j++){
            blank[i+"_"+j]=true;
            $('<div>').addClass('qizi').appendTo(b).data('pos',{x:i,y:j}).attr('id',i+"_"+j);
        }
    }
    b.on('click','.qizi',function () {
        if($(this).is('.hei')||$(this).hasClass('bai')){
            return;
        }
        let data = $(this).data('pos');
        delete blank[data.x+"_"+data.y];
        if(flag) {
            $(this).addClass('hei');
            hei[data.x+'_'+data.y]=true;
            if(success(data,hei) >= 5){
                console.log('hei');
                b.off();
                return;
            }
            if(ai){
                let pos = position();
                $('#' + pos.x + "_" + pos.y).addClass('bai');
                bai[pos.x+"_"+pos.y] = true;
                delete blank[pos.x+"_"+pos.y];
                if(success(pos,bai) >= 5){
                    console.log('bai');
                    b.off();
                    return;
                }
                return;
            }
        }
        else {
            $(this).addClass('bai');
            bai[data.x+'_'+data.y]=true;
            if(success(data,bai) >= 5){
                console.log('bai');
                b.off();
                return;
            }
        }
        flag = !flag;
    })

    function position() {
        let score1 =0 ,score2=0,pos1=null,pos2=null;
        for(let i in blank){
            let obj ={x:i.split('_')[0],y:i.split('_')[1]};
            if (success(obj,hei)> score1){
                score1 = success(obj,hei);
                pos1=obj;
            }
            if(success(obj,bai)> score2){
                score2 = success(obj,bai);
                pos2 = obj;
            }
        }
        return score1>= score2?pos1:pos2;
    }
    function success(pos,obj){
        let h = 1, s = 1 , z = 1 , y = 1;
        let px = pos.x, py = pos.y;
        while (obj[(++px)+'_'+py]){
            h++;
        }
        px = pos.x;
        while (obj[(--px)+'_'+py]){
            h++;
        }
        px = pos.x;
        while(obj[px+'_'+(++py)]){
            s++;
        }
        py = pos.y;
        while(obj[px+'_'+(--py)]){
            s++;
        }
        py = pos.y;
        while (obj[(++px)+'_'+(++py)]){
            y++;
        }
        px=pos.x,py = pos.y;
        while(obj[(++px)+'_'+(--py)]) {
            y++;
        }
        px=pos.x,py = pos.y;
        while(obj[(--px)+'_'+(++py)]) {
            z++;
        }
        px=pos.x,py = pos.y;
        while(obj[(--px)+'_'+(--py)]) {
            z++;
        }
        return Math.max(h,s,z,y);
        console.log(Math.max(h,s,z,y))
    }
})

