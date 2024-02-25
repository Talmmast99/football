import dataTeams from './modules/team.js';
import dataFields from './modules/field.js';


window.addEventListener('DOMContentLoaded', function()
{
    var ax1 = document.querySelectorAll('.settings .topbar .item-tab'),
        ax2 = document.querySelectorAll('.settings .container .box'),
        ax3;
    var tx1 = document.querySelectorAll('.settings .container .teams > div');

    const btnAddNewPlayer = document.querySelector('#add-new-player');
    const popupAddNewPlayer = document.querySelector('#popup-addNewPlayer');
    const closePopupPlayer = document.querySelector('#popup-addNewPlayer .close');
    const axt98 = document.querySelector('.axt98 .control');

    // Events 
    axt98.onclick = () => axt98.parentElement.classList.toggle('left-0');
    
    btnAddNewPlayer.addEventListener('click', function()
    {
        popupAddNewPlayer.classList.add('showPopup');
    })

    closePopupPlayer.addEventListener('click', function()
    {
        popupAddNewPlayer.classList.remove('showPopup');
    })
        
    ax1.forEach( a => 
    {
        a.addEventListener('click', function()
        {
            let currentId = a.id;
            ax2.forEach(x => {
                if(currentId == x.dataset.key)
                    x.classList.add('active')
                else
                    x.classList.remove('active')
            })
        })
    })
    generateViewStadium();

    
    // get all keys 

    for (const key in dataTeams) {
        if (Object.hasOwnProperty.call(dataTeams, key)) {
            this.document.querySelector('.container .teams').innerHTML += '<div data-team="' + key +'">'+ extractString(key) +'</div>'
        }
    }

    /* teams */

    tx1.forEach( t => 
    {
        t.addEventListener('click', function()
        {
            let val = t.dataset.team;
            generateTeams(dataTeams[val]);
        })
    })

    /*
     *
     *  Functions
     *  
    */

    function generateTeams(data)
    {   
        // if this function is called, in the second click you can block it [Me]
        // If this function is called, you can block it on the second click. [Chatgpt]

        document.querySelector('.stadium #field .players').innerHTML = '';
        data.forEach((p, index) => 
        {
            let div = 
                `
                    <div class="player" id="player-${index+1}" style="left: ${p.x}; top: ${p.y}"></div>
                    <div class="player-name player-${ index + 1 }-name" style="left: ${p.x}; top: ${p.y}"></div>
                `
            document.querySelector('.stadium #field .players').innerHTML += div;

            // ⏳⏳
            // when user choose the tactic you can generate players infos 
        })
        generatePlayers();
    }

    function generatePlayers()
    {
        for (let x = 0; x < 11; x++) 
        {
            let div = 
                `
                    <div>
                        <label> Player ${ x + 1 } </label>
                        <input type="text" class="input-player-name" id="player-${ x + 1 }-name">
                    </div>
                `;

            document.querySelector('.settings .container .players').innerHTML += div;
        }

        ax3 = document.querySelectorAll('.settings .container .players .input-player-name');
        generateEventsInputs(ax3);
    }
 

    // function generatePlayerName()
    // {
    //     // let div = 
    //     //     `
    //     //         <div>
    //     //             <span>${}</span> 
    //     //         </div>
    //     //     `
    // }

    /* 
    *   ⏳⏳⏳⏳
    *   I can do that using two methods.
    *   First, I create a second element with the player's position. [Done]
    *   Second, I will generate an element in the first key inserted in the input.
    */
    function generateEventsInputs(inputs)
    {
        inputs.forEach(input =>
            input.addEventListener('keyup',function()
            {
                document.querySelector('.' + input.id).innerHTML = input.value;
            })
        )
    }

    // just for learning
    // function to split a string => team-433 convert to 4-3-3 
    // Optimize this functions & use the regex
    function extractString(str)
    {
        //  first method
        let x = str.split('-')[1], val=""; 
        for(let y=0; y<x.length; y++) 
        { 
            if(y!=0) val += ('-'+ x[y]); 
            else val+= x[y];
        }
        return val;
    }

    function generateViewStadium()
    {
        dataFields.forEach( f => 
        {
            let div = 
                `
                    <div data-stadium="${ f.label }">
                        <img src="./assets/images/${ f.image }" alt="" >
                    </div>
                `;
            document.querySelector('.settings .container .box.stadium').innerHTML += div;
        })
        generateEventsFields();
    }

    function generateEventsFields()
    {
        let fields = document.querySelectorAll('.settings .container .box.stadium > div')
        
        fields.forEach(field =>
            field.addEventListener('click',function()
            {
                let el = dataFields.find( x => x.label == field.dataset.stadium);
                if(el)
                {
                    if(el.parts == "hide")
                    {
                        document.querySelector('.field-box .parts').style.display = "none";
                    }
                    else
                    {
                        document.querySelector('.field-box .parts').style.display = "flex";
                    }

                    /* OPtimize this code () */

                    document.querySelector('.skeleton .center-circle').style.borderColor = el.skeleton.color; 
                    document.querySelector('.skeleton .goal-left').style.borderColor = el.skeleton.color; 
                    document.querySelector('.skeleton .goal-right').style.borderColor = el.skeleton.color; 
                    document.querySelector('.skeleton .center-line').style.borderColor = el.skeleton.color; 
                    document.querySelector('.skeleton').style.borderColor = el.skeleton.color; 
                    document.querySelector('#field').style.backgroundColor = el.skeleton.background;
                }
            })
        )
    }

    // function to remove the default click behavior of buttons.
    (function removeDefaultEvents(){
        document.querySelectorAll('button').forEach(btn => 
            btn.addEventListener('click',(e)=> e.preventDefault())
        )
    }());

})  


/* features */

/*
*    drag & drop ( user can add her tactic ) 
*    you can create data 
* 
*/


/* Global Functions */

// function element(element)
// {
//     element.innerHTML = ""
// }

