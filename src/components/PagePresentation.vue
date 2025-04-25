<template>
   
        <!-- Navbar & Hero Start -->
        <div class="container-fluid position-relative p-0">
            <nav class="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                <a href="" class="navbar-brand p-0">
                    <h1 class="text-primary"><i class="fas fa-car me-3"></i>Auto-Call</h1>
                    <!-- <img src="img/logo.png" alt="Logo"> -->
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span class="fa fa-bars"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav ms-auto py-0">
                        <a href="#" class="nav-item nav-link active">Home</a>
                      
                        <a href="#" class="nav-item nav-link">Contact</a>
                    </div>
                    <div class="d-none d-xl-flex me-3">
                        <div class="d-flex flex-column pe-3 border-end border-primary">
                            <!-- <span class="text-body">Get Free Delivery</span> -->
                            <a href="tel:+4733378901"><span class="text-primary">Free: +228 93462153</span></a>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-md-square d-flex flex-shrink-0 mb-3 mb-lg-0 rounded-circle me-3" data-bs-toggle="modal" data-bs-target="#searchModal"><i class="fas fa-search"></i></button>
                    <a href="/login" class="btn btn-primary rounded-pill d-inline-flex flex-shrink-0 py-2 px-4">S'enrouller aux cours</a>
                </div>
            </nav>

            <!-- Carousel Start -->
            <div class="carousel-header">
                <div id="carouselId" class="carousel slide" data-bs-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-bs-target="#carouselId" data-bs-slide-to="0" class="active"></li>
                        <li data-bs-target="#carouselId" data-bs-slide-to="1"></li>
                        <li data-bs-target="#carouselId" data-bs-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner" role="listbox">
                        
                        <div class="carousel-item active">
                            <img src="./assets/carousel-2.jpg" class="img-fluid w-100" alt="Image">
                            <div class="carousel-caption-2">
                                <div class="carousel-caption-2-content" style="max-width: 900px;">
                                    <h4 class="text-white text-uppercase fw-bold mb-4 fadeInRight animated" data-animation="fadeInRight" data-delay="1s" style="animation-delay: 1s;" >Importance life</h4>
                                    <h1 class="display-2 text-capitalize text-white mb-4 fadeInRight animated" data-animation="fadeInRight" data-delay="1.3s" style="animation-delay: 1.3s;">Ayez accès à une formation de qualité.</h1>
                                    <p class="mb-5 fs-5 text-white fadeInRight animated" data-animation="fadeInRight" data-delay="1.5s" style="animation-delay: 1.5s;">"Faites de la route votre alliée avec notre auto-école ! Nous vous offrons bien plus que des leçons de conduite – c'est un accompagnement complet vers l'indépendance au volant. Inscrivez-vous et commencez votre aventure vers la maîtrise totale de la conduite !"</p>
                                    <div class="carousel-caption-2-content-btn fadeInRight animated" data-animation="fadeInRight" data-delay="1.7s" style="animation-delay: 1.7s;">
                                        <a class="btn btn-primary rounded-pill flex-shrink-0 py-3 px-5 me-2" href="#">Order Now</a>
                                        <a class="btn btn-secondary rounded-pill flex-shrink-0 py-3 px-5 ms-2" href="#">Free Estimate</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
            
<!-- Mode de payement -->

            <div class="containers">
        <h1>Choisissez votre Pack</h1>
        <div class="packs">
            <div class="pack basic">
                <h2>Pack Basic</h2>
                <p>Accès aux cours de conduite de base</p>
                <p class="price">50€</p>
                <button onclick="selectPack('basic')">Choisir ce Pack</button>
            </div>
            <div class="pack standard">
                <h2>Pack Standard</h2>
                <p>Accès aux cours de conduite + simulations</p>
                <p class="price">100€</p>
                <button onclick="selectPack('standard')">Choisir ce Pack</button>
            </div>
            <div class="pack premium">
                <h2>Pack Premium</h2>
                <p>Accès complet + coaching personnalisé</p>
                <p class="price">200€</p>
                <button onclick="selectPack('premium')">Choisir ce Pack</button>
            </div>
        </div>

        <h1>Modes de Paiement</h1>
        <div class="payment-methods">
            <div class="payment-method">
                <input type="radio" id="credit-card" name="payment-method" value="credit-card">
                <label for="credit-card">Carte de Crédit</label>
            </div>
            <div class="payment-method">
                <input type="radio" id="paypal" name="payment-method" value="paypal">
                <label for="paypal">PayPal</label>
            </div>
            <div class="payment-method">
                <input type="radio" id="bank-transfer" name="payment-method" value="bank-transfer">
                <label for="bank-transfer">Virement Bancaire</label>
            </div>
        </div>

        <button class="pay-now" onclick="payNow()">Payer Maintenant</button>
    </div>


    <!-- Prise de rendez vous-->
     <p><h4>Prise de rendez-vous</h4></p>
    <p>
        <div class="calendar">
        <div class="calendar-header">
            <button>&lt; Mois précédent</button>
            <h2>Août 2024</h2>
            <button>Mois suivant &gt;</button>
        </div>
        <div class="days-of-week">
            <div>Lundi</div>
            <div>Mardi</div>
            <div>Mercredi</div>
            <div>Jeudi</div>
            <div>Vendredi</div>
            <div>Samedi</div>
            <div>Dimanche</div>
        </div>
        <div class="hours">
            <div class="hour-slot">
                <div class="appointment">10h - 11h</div>
            </div>
            <div class="hour-slot"></div>
            <div class="hour-slot">
                <div class="appointment">13h - 14h</div>
            </div>
            <div class="hour-slot"></div>
            <div class="hour-slot"></div>
            <div class="hour-slot"></div>
            <div class="hour-slot"></div>
        </div>
    </div>
    </p>







    <footer style="background-color: #333; color: #fff; padding: 40px 0; text-align: center;">
    <div style="max-width: 1200px; margin: auto;">
        <!-- Section des informations de contact -->
        <div style="margin-bottom: 20px;">
            <p style="margin: 5px 0;">Téléphone: +228 93 46 21 53</p>
            <p style="margin: 5px 0;">Email: info@exemple.com</p>
            <p style="margin: 5px 0;">Adresse: 123 Rue Exemple, Lome, Togo</p>
        </div>

        <!-- Section des réseaux sociaux -->
        <div style="margin-bottom: 20px;">
            <a href="#" style="color: #fff; margin: 0 10px; text-decoration: none;">
                <img src="https://img.icons8.com/material-outlined/24/ffffff/facebook-new.png" alt="Facebook"/>
            </a>
            <a href="#" style="color: #fff; margin: 0 10px; text-decoration: none;">
                <img src="https://img.icons8.com/material-outlined/24/ffffff/twitter.png" alt="Twitter"/>
            </a>
            <a href="#" style="color: #fff; margin: 0 10px; text-decoration: none;">
                <img src="https://img.icons8.com/material-outlined/24/ffffff/instagram-new.png" alt="Instagram"/>
            </a>
            <a href="#" style="color: #fff; margin: 0 10px; text-decoration: none;">
                <img src="https://img.icons8.com/material-outlined/24/ffffff/linkedin.png" alt="LinkedIn"/>
            </a>
        </div>

        <!-- Section de copyright -->
        <div style="margin-top: 20px; border-top: 1px solid #555; padding-top: 20px;">
            <p style="margin: 0;">© 2024 TonEntreprise. Tous droits réservés.</p>
        </div>
        </div>
    </footer>
   
    </div>
    
      
</template>

<style scoped>

.containers {
    width: 100%;
  
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    justify-content: center
}

h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #3498db;
}

.packs {
    display: flex;
    justify-content: space-around;
    margin-bottom: 40px;
}

.pack {
    flex: 1;
    margin: 0 10px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

.pack:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.pack h2 {
    font-size: 1.8em;
    margin-bottom: 15px;
}

.pack p {
    font-size: 1.2em;
}

.price {
    font-size: 1.5em;
    color: #e74c3c;
    margin: 20px 0;
}

.basic {
    background-color: #ecf0f1;
    color: #2c3e50;
}

.standard {
    background-color: #3498db;
    color: white;
}

.premium {
    background-color: #2ecc71;
    color: white;
}

button {
    padding: 12px 25px;
    background-color: #2980b9;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    font-size: 1.1em;
}

button:hover {
    background-color: #1c598a;
    transform: translateY(-3px);
}

button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.5);
}

.payment-methods {
    margin-bottom: 40px;
}

.payment-method {
    margin-bottom: 15px;
}

.payment-method input[type="radio"] {
    margin-right: 10px;
}

.pay-now {
    background-color: #e74c3c;
}

.pay-now:hover {
    background-color: #c0392b;
}






.calendar {
            width: 100%;
            
            background: linear-gradient(135deg, #89fffd, #ef32d9);
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }

        .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #fff;
            padding: 10px 20px;
            background-color: #333;
            border-radius: 10px;
        }

        .calendar-header h2 {
            margin: 0;
        }

        .calendar-header button {
            background-color: #fff;
            color: #333;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s;
        }

        .calendar-header button:hover {
            background-color: #ddd;
        }

        .days-of-week {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            text-align: center;
            margin-top: 10px;
            color: #fff;
            font-weight: bold;
        }

        .day {
            padding: 10px;
            border-radius: 50%;
            margin: 5px;
            transition: background-color 0.3s, transform 0.3s;
        }

        .day:hover {
            background-color: #fff;
            color: #333;
            transform: scale(1.1);
        }

        .hours {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            text-align: center;
            margin-top: 10px;
            color: #fff;
        }

        .hour-slot {
            background-color: rgba(255, 255, 255, 0.2);
            margin: 5px;
            padding: 15px;
            border-radius: 10px;
            position: relative;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.3s;
        }

        .hour-slot:hover {
            background-color: #fff;
            color: #333;
            transform: scale(1.05);
        }

        .appointment {
            background-color: rgba(0, 128, 255, 0.8);
            color: #fff;
            padding: 10px;
            border-radius: 10px;
            font-weight: bold;
            text-align: center;
        }










/*** Navbar ***/
.navbar-light .navbar-nav .nav-link {
    position: relative;
    margin-right: 25px;
    padding: 35px 0;
    color: var(--bs-white);
    font-size: 17px;
    font-weight: 400;
    outline: none;
    transition: .5s;
}

.sticky-top.navbar-light .navbar-nav .nav-link {
    padding: 20px 0;
    color: var(--bs-dark);
}

.navbar-light .navbar-nav .nav-link:hover,
.navbar-light .navbar-nav .nav-link.active {
    color: var(--bs-primary);
}

.navbar-light .navbar-brand img {
    max-height: 60px;
    transition: .5s;
}

.sticky-top.navbar-light .navbar-brand img {
    max-height: 45px;
}

.navbar .dropdown-toggle::after {
    border: none;
    content: "\f107";
    font-family: "Font Awesome 5 Free";
    font-weight: 600;
    vertical-align: middle;
    margin-left: 8px;
}

.dropdown .dropdown-menu a:hover {
    background: var(--bs-primary);
    color: var(--bs-white);
}

.navbar .nav-item:hover .dropdown-menu {
    transform: rotateX(0deg);
    visibility: visible;
    background: var(--bs-light);
    transition: .5s;
    opacity: 1;
}

@media (max-width: 991.98px) {
    .sticky-top.navbar-light {
        position: relative;
        background: var(--bs-white);
    }

    .navbar.navbar-expand-lg .navbar-toggler {
        padding: 10px 20px;
        border: 1px solid var(--bs-primary);
        color: var(--bs-primary);
    }

    .navbar-light .navbar-collapse {
        margin-top: 15px;
        border-top: 1px solid rgba(0, 0, 0, .08);
    }

    .navbar-light .navbar-nav .nav-link,
    .sticky-top.navbar-light .navbar-nav .nav-link {
        padding: 10px 0;
        margin-left: 0;
        color: var(--bs-dark);
    }

    .navbar-light .navbar-brand img {
        max-height: 45px;
    }
}

@media (min-width: 992px) {
    .navbar .nav-item .dropdown-menu {
        display: block;
        visibility: hidden;
        top: 100%;
        transform: rotateX(-75deg);
        transform-origin: 0% 0%;
        border: 0;
        border-radius: 10px;
        transition: .5s;
        opacity: 0;
    }

    .navbar-light {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        border-top: 0;
        border-right: 0;
        border-bottom: 1px solid;
        border-left: 0;
        border-style: dotted;
        z-index: 999;
    }
    
    .sticky-top.navbar-light {
        position: fixed;
        background: var(--bs-light);
        border: none;
    }

    .navbar-light .navbar-nav .nav-item::before {
        position: absolute;
        content: "";
        width: 0;
        height: 2px;
        bottom: -1px;
        left: 50%;
        background: var(--bs-primary);
        transition: .5s;
    }

    .sticky-top.navbar-light .navbar-nav .nav-item::before {
        bottom: 0;
    }

    .navbar-light .navbar-nav .nav-item::after {
        content: "";
        position: absolute;
        bottom: 1px;
        left: 50%;
        transform: translateX(-50%);
        border: 10px solid;
        border-color: transparent transparent var(--bs-primary) transparent;
        opacity: 0;
        transition: 0.5s;
    }

    .navbar-light .navbar-nav .nav-item:hover::after,
    .navbar-light .navbar-nav .nav-item.active::after {
        bottom: 1px;
        opacity: 1;
    }

    .navbar-light .navbar-nav .nav-item:hover::before,
    .navbar-light .navbar-nav .nav-item.active::before {
        width: calc(100% - 2px);
        left: 1px;
    }

    .navbar-light .navbar-nav .nav-link.nav-contact::before {
        display: none;
    }
}

/*** Button Start ***/
.btn {
    font-weight: 600;
    transition: .5s;
}

.btn-square {
    width: 32px;
    height: 32px;
}

.btn-sm-square {
    width: 34px;
    height: 34px;
}

.btn-md-square {
    width: 44px;
    height: 44px;
}

.btn-lg-square {
    width: 56px;
    height: 56px;
}

.btn-xl-square {
    width: 66px;
    height: 66px;
}

.btn-square,
.btn-sm-square,
.btn-md-square,
.btn-lg-square,
.btn-xl-square {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: normal;
}

.btn.btn-primary {
    color: var(--bs-white);
}

.btn.btn-primary:hover {
    background: var(--bs-secondary);
    border: 1px solid var(--bs-secondary);
}

.btn.btn-secondary {
    color: var(--bs-white);
   
}

.btn.btn-secondary:hover {
    background: var(--bs-primary);
    border: 1px solid var(--bs-primary);
}


/*** Carousel Hero Header Start ***/
.carousel-header {
    position: relative;
    overflow: hidden;
}

.carousel-indicators {
    display: none;
}

.carousel .carousel-control-prev,
.carousel .carousel-control-next {
    width: 0;
}

.carousel .carousel-control-prev .carousel-control-prev-icon,
.carousel .carousel-control-next .carousel-control-next-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 25px 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bs-primary);
    transition: 0.5s;
}

.carousel .carousel-control-prev .carousel-control-prev-icon {
    left: 0;
    border-left: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 50px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 50px;

}

.carousel .carousel-control-next .carousel-control-next-icon {
    right: 0;
    border-right: 0;
    border-top-left-radius: 50px;
    border-top-right-radius: 0;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 0;
}

.carousel .carousel-control-prev .carousel-control-prev-icon:hover,
.carousel .carousel-control-next .carousel-control-next-icon:hover {
    background: var(--bs-secondary);
}

.carousel .carousel-inner .carousel-item {
    position: relative;
}

.carousel .carousel-inner .carousel-item .carousel-caption-1  {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding-top: 100px;
    display: flex;
    align-items: center;
    justify-content: end;
    background: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, 0.5));
    background-size: cover;
}

.carousel-caption-1-content {
    text-align: end;
    padding-right: 100px;
}

.carousel-caption-1-content .carousel-caption-1-content-btn {
    display: flex;
    justify-content: end;
}

.carousel .carousel-inner .carousel-item .carousel-caption-2  {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding-top: 100px;
    display: flex;
    align-items: center;
    text-align: center;
    background: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, 0.5));
    background-size: cover;
}

.carousel-caption-2-content {
    text-align: start;
    padding-left: 100px;
}

.carousel-caption-2-content .carousel-caption-2-content-btn {
    display: flex;
    justify-content: start;
}


@media (max-width: 992px) {
    .carousel .carousel-inner .carousel-item {
        height: 700px;
        margin-top: -100px;
    }

    .carousel .carousel-inner .carousel-item img {
        height: 700px;
        object-fit: cover;
    }


    .carousel .carousel-inner .carousel-item .carousel-caption-1 {
        max-width: 100% !important;
        justify-content: center;
    }

    .carousel-caption-1-content {
        padding: 0 20px !important;
        text-align: center !important;
    }

    .carousel-caption-1-content .carousel-caption-1-content-btn {
        justify-content: center;
    }


    .carousel .carousel-inner .carousel-item .carousel-caption-2 {
        max-width: 100% !important;
        justify-content: center;
    }

    .carousel-caption-2-content {
        padding: 0 20px !important;
        text-align: center !important;
    }

    .carousel-caption-2-content .carousel-caption-2-content-btn {
        justify-content: center;
    }



    .carousel .carousel-control-prev .carousel-control-prev-icon,
    .carousel .carousel-control-next .carousel-control-next-icon {
        display: none;
    }
}

.modal .modal-header {
    height: 100px;
}

#searchModal .modal-content {
    background: rgba(255, 255, 255, .6);
}
/*** Carousel Hero Header End ***/

.blog .blog-item:hover .blog-img::after {
    background: rgba(0, 209, 249, 0.2);
}

.btn.btn-primary {
    color: var(--bs-white);
}

.btn.btn-primary:hover {
    background: var(--bs-secondary);
    border: 1px solid var(--bs-secondary);
}



</style>