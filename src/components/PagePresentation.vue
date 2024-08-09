<template>
      <!-- Spinner Start -->
      <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <!-- Spinner End -->

        <!-- Navbar & Hero Start -->
        <div class="container-fluid position-relative p-0">
            <nav class="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                <a href="" class="navbar-brand p-0">
                    <h1 class="text-primary"><i class="fas fa-hand-holding-water me-3"></i>Auto-Call</h1>
                    <!-- <img src="img/logo.png" alt="Logo"> -->
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span class="fa fa-bars"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav ms-auto py-0">
                        <a href="#" class="nav-item nav-link active">Home</a>
                        <!-- <a href="#" class="nav-item nav-link">About</a>
                        <a href="#" class="nav-item nav-link">Service</a>
                        <a href="#" class="nav-item nav-link">Blog</a>
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div class="dropdown-menu m-0">
                                <a href="#" class="dropdown-item">Our Feature</a>
                                <a href="#" class="dropdown-item">Our Product</a>
                                <a href="#" class="dropdown-item">Our Team</a>
                                <a href="#" class="dropdown-item">Testimonial</a>
                                <a href="#" class="dropdown-item">404 Page</a>
                            </div>
                        </div> -->
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
                            <img src="./assets/carousel-1.jpg" class="img-fluid w-100" alt="Image">
                            <div class="carousel-caption-1">
                                <div class="carousel-caption-1-content" style="max-width: 900px;">
                                    <h4 class="text-white text-uppercase fw-bold mb-4 fadeInLeft animated" data-animation="fadeInLeft" data-delay="1s" style="animation-delay: 1s;" >Importance life</h4>
                                    <h1 class="display-2 text-capitalize text-white mb-4 fadeInLeft animated" data-animation="fadeInLeft" data-delay="1.3s" style="animation-delay: 1.3s;">Un suivi inégal.</h1>
                                    <p class="mb-5 fs-5 text-white fadeInLeft animated" data-animation="fadeInLeft" data-delay="1.5s" style="animation-delay: 1.5s;">"Préparez-vous à conduire en toute confiance avec notre auto-école ! Avec des cours adaptés à votre rythme, un suivi personnalisé, et des formateurs expérimentés, nous vous accompagnons à chaque étape pour vous assurer de passer votre permis avec succès. Rejoignez-nous et mettez toutes les chances de votre côté pour une conduite sûre et maîtrisée !"</p>
                                    <div class="carousel-caption-1-content-btn fadeInLeft animated" data-animation="fadeInLeft" data-delay="1.7s" style="animation-delay: 1.7s;">
                                        <a class="btn btn-primary rounded-pill flex-shrink-0 py-3 px-5 me-2" href="#">Order Now</a>
                                        <a class="btn btn-secondary rounded-pill flex-shrink-0 py-3 px-5 ms-2" href="#">Free Estimate</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
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
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon btn btn-primary fadeInLeft animated" aria-hidden="true" data-animation="fadeInLeft" data-delay="1.1s" style="animation-delay: 1.3s;"> <i class="fa fa-angle-left fa-3x"></i></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                        <span class="carousel-control-next-icon btn btn-primary fadeInRight animated" aria-hidden="true" data-animation="fadeInLeft" data-delay="1.1s" style="animation-delay: 1.3s;"><i class="fa fa-angle-right fa-3x"></i></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <!-- Carousel End -->
        </div>
        <!-- Navbar & Hero End -->

        <!-- Modal Search Start -->
        <div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content rounded-0">
                    <div class="modal-header">
                        <h4 class="modal-title mb-0" id="exampleModalLabel">Search by keyword</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex align-items-center">
                        <div class="input-group w-75 mx-auto d-flex">
                            <input type="search" class="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1">
                            <span id="search-icon-1" class="input-group-text btn border p-3"><i class="fa fa-search text-white"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal Search End -->
</template>

<style scoped>

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