<template>
    <div class="lds-dual-ring mx-auto"></div>
</template>

  
<style>
.lds-dual-ring {
    display: block;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    border: 2px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring .7s linear infinite;
}

@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
  