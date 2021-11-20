let grid,ht;
let c=0,clicked,matches=0,moves=30;

let select_btn=document.querySelector("#select");
document.querySelector('#moves_left').style.visibility="hidden";
document.querySelector('#matches').style.visibility="hidden";



select_btn.addEventListener('change',function(ev)
{
    document.querySelector('.container1').style.visibility="unset";
    document.querySelector('label').style.visibility="hidden";
    if(select_btn.value==="easy_select")
    {
        let grid_selector=document.querySelector('#easy_select');
        grid_selector.style.visibility="unset";
        grid=document.querySelectorAll(`#easy`);
        document.querySelector('#hard_select').remove();
        document.querySelector('#med_select').remove();
        pics=['cover.png','flower1.jpg','flower2.jfif','flower3.png','flower4.png','flower5.jfif','flower6.png','flower7.jfif','cover.png','flower1.jpg','flower2.jfif','flower3.png','flower4.png','flower5.jfif','flower6.png','flower7.jfif']
        ht='100px';
        moves=35;
    }
    else if(select_btn.value==="med_select")
    {
        let grid_selector=document.querySelector('#med_select');
        document.querySelector('#easy_select').remove();
        document.querySelector('#hard_select').remove();
        grid_selector.style.visibility="unset";
        grid=document.querySelectorAll(`#medium`);
        ht='75px';
        moves=55;
        pics=['cover.png','flower1.jpg','flower2.jfif','flower3.png','flower4.png','flower5.jfif','flower6.png','flower7.jfif','cover.png','flower1.jpg','flower2.jfif','flower3.png','flower4.png','flower5.jfif','flower6.png','flower7.jfif','flower4.png','flower5.jfif','flower6.png','flower7.jfif','flower4.png','flower5.jfif','flower6.png','flower7.jfif']
       // console.log(pics);
    }
    else if(select_btn.value==="hard_select")
    {
        let grid_selector=document.querySelector('#hard_select');
        grid_selector.style.visibility="unset";
        grid=document.querySelectorAll(`#hard`);
        ht='75px';
        document.querySelector('#easy_select').remove();
        document.querySelector('#med_select').remove();
        pics=['cover.png','flower1.jpg','flower2.jfif','flower3.png','flower4.png','flower5.jfif','flower6.png','flower7.jfif','cover.png','flower1.jpg','flower2.jfif','flower3.png','flower4.png','flower5.jfif','flower6.png','flower7.jfif','cover.png','flower1.jpg','flower2.jfif','flower3.png','flower4.png','flower5.jfif','flower6.png','flower7.jfif','cover.png','flower1.jpg','flower2.jfif','flower3.png','flower4.png','flower5.jfif','flower6.png','flower7.jfif','flower4.png','flower5.jfif','flower4.png','flower5.jfif']
        moves=70;
    }

    select_btn.remove();
    document.querySelector('#label').remove();
    document.querySelector('h4').remove();
    document.querySelector('h3').remove();
    document.querySelector('#moves_left').style.visibility="visible";
    document.querySelector('#matches').style.visibility="visible";
    document.querySelector('h1').innerText=`You have ${moves} moves in total to find out all the matches!`;

    for (var i = pics.length - 1; i > 0; i--) { 
 
        var j = Math.floor(Math.random() * (i + 1));
                     
        var temp = pics[i];
        pics[i] = pics[j];
        pics[j] = temp;
    }
    
   
  
    for(let i=0;i<grid.length;i++)
    {
        grid[i].addEventListener('click',function(ev)
        {
            moves--;
            if(moves<=0)
            {
                for(let j=0;j<grid.length;j++)
                grid[j].disabled='true';
                document.querySelector('h1').innerText=`Better Luck Next Time!`;
                alert("Sorry, you lost!");
            }
           
            //console.log(matches);s
            for(let j=0;j<grid.length;j++)
            grid[j].style.height=ht;

            c++;
            grid[i].style.backgroundImage="url("+pics[i]+")";
            grid[i].style.backgroundSize='100%';
          

            if(c%2==0)
            {
                if(pics[i]!==pics[clicked])
                {
                    for(let j=0;j<grid.length;j++)
                    grid[j].disabled='true';

                    

                    setTimeout(function()
                    {
                        grid[i].removeAttribute('style','backgroundImage');
                        grid[clicked].removeAttribute('style','backgroundImage');

                        for(let j=0;j<grid.length;j++)
                        grid[j].removeAttribute("disabled")
                    }, 1000 );
                   

                }
                else{
                    pics[i].disabled='true';
                    pics[clicked].disabled='true';
                    matches++;
                    document.querySelector('#matches').innerText=`Matches Made: ${matches}`;
                    moves=moves+2;
                    if(matches===(grid.length/2))
                    {
                        alert("Congratulations! You Won!!");
                        for(let j=0;j<grid.length;j++)
                        grid[j].disabled='true';
                        document.querySelector('h1').innerText=`Congratulations! You won !!`;
                    }
                }
            }
            else
                clicked=i;
                document.querySelector('#moves_left').innerText=`Moves Left: ${moves}`;
        })
    }
})


