
export function About() {
    return <section className="about">
        <h1>About us</h1>
        <section className="about-card">
            <img className="about-pic" src="./assets/img/ligalpic.jpg"></img>
            <div>
                <h2>Ligal Levinson</h2>
                <p class="about--container">Mom of Lior and Doron, powerfull, kind women and A Fullstack developer to be.
                    My moto for life is "You can not lose if you never stop trying"
                </p>
            </div>
        </section>
        <section className="about-card">
            <img className="about-pic" src="./assets/img/adi-img.jpg"></img>
            <div>
                <h2>Adi Ben-Ami</h2>
                <p class="about--container">Mom of Geffen and Arbel, a Diettitian and A Fullstack developer to be.
                    My moto for life is "Love what you do and do what you love"
                </p>
            </div>
        </section>

        {/* <p class="social-links-container">
                        <a href="https://www.linkedin.com/in/adi-ben-ami-6674b579"><i
                                class="fa-brands fa-linkedin fa-2xl" style="color: #a7727d;"></i></a>
                        <a href="https://www.facebook.com/adi.afriat10/"><i class="fa-brands fa-square-facebook fa-2xl"
                                style="color: #a7727d;"></i></a>
                        <a href="https://github.com/AdiBenAmi"><i class="fa-brands fa-square-github fa-2xl"
                                style="color: #a7727d;"></i> </a>
                    </p> */}
    </section>
}
