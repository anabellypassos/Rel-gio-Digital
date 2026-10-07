function clockUpdate() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    document.getElementById('clock').textContent =
        `${hours}:${minutes}:${seconds}`;

    dailySchedules();
}

function dailySchedules() {
    const hours = new Date().getHours();
    const container = document.getElementById('container');
    const clock = document.getElementById('clock');
    const button1 = document.getElementById('button1');
    const button2 = document.getElementById('button2');
    const button3 = document.getElementById('button3');
    const button4 = document.getElementById('button4');
    const CatsGifdaily = document.getElementById('catsGif')

    if (hours < 12) {
        container.style.backgroundImage =
            "url('./imgs/schedules/morningIMG.png')";
        clock.style.border = "10px solid #e07c93bd";
        button1.style.color = "#E07C93";
        button1.style.border = "#E07C93";
        button2.style.color = "#E07C93";
        button2.style.border = "#E07C93";
        button3.style.color = "#E07C93";
        button3.style.border = "#E07C93";
        button4.style.color = "#E07C93";
        button4.style.border = "#E07C93";
        CatsGifdaily.src = ('./imgs/catsGifs/morning.gif')


        button1.hover.style.background = "#E07C93";


    } else if (hours < 18) {
        container.style.backgroundImage =
            "url('./imgs/schedules/afternoonIMG.png')";
        clock.style.border = "10px solid #81026c59";
        button1.style.color = "#ec6f8c";
        button1.style.border = " 2px solid #ec6f8c";
        button2.style.color = "#ec6f8c";
        button2.style.border = "2px solid #ec6f8c";
        button3.style.color = "#ec6f8c";
        button3.style.border = " 2px solid #ec6f8c";
        button4.style.color = "#ec6f8c";
        button4.style.border = "2px solid #ec6f8c";
        CatsGifdaily.src = ('./imgs/catsGifs/afternoon.gif')
    } else {
        container.style.backgroundImage =
            "url('./imgs/schedules/nightIMG.png')";
        clock.style.border = "10px solid #3d073459";
        button1.style.color = "#450452";
        button1.style.border = "2px solid #450452";
        button2.style.color = "#450452";
        button2.style.border = "2px solid #450452";

        button3.style.color = "#450452";
        button3.style.border = "2px solid #450452";

        button4.style.color = "#450452";
        button4.style.border = "2px solid #450452";
        CatsGifdaily.src = ('./imgs/catsGifs/nigth.gif')

    }


}

setInterval(clockUpdate, 1000);

clockUpdate();
