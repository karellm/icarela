document.addEventListener('DOMContentLoaded', function () {
    var $toggle = document.getElementsByClassName('page-menu-toggle')[0]
    var $hamburger = document.getElementsByClassName('hamburger')[0]
    var $menu = document.getElementsByClassName('page-menu')[0]
    $toggle.addEventListener('click', function (event) {
        $menu.classList.toggle('open')
        $hamburger.classList.toggle('open')
    })

    var $form = document.querySelector('.mailing-list')
    var $message = document.querySelector('.message')
    var $email = document.getElementById('fieldEmail')
    var $name = document.getElementById('fieldName')
    var url = $form.getAttribute('action').replace('/post?', '/post-json?')

    $form.addEventListener('submit', function (event) {
        event.preventDefault()

        var data = new FormData($form)

        if (/@/.test($email.value) && $name.value) {
            $email.classList.remove('error')
            $name.classList.remove('error')
            $message.classList.remove('error', 'success')

            document.MC_callback = function (response) {
                if (response.result == 'success') {
                    $email.value = ''
                    $name.value = ''
                    $message.classList.add('success')
                    $message.innerText = 'Succès ! Une confirmation vous a été envoyée par email.'
                }
                else if (response.msg && response.msg.indexOf('already subscribed')) {
                    $message.classList.add('error')
                    $message.innerText = 'Vous êtes déjà inscrit(e).'
                }
                else {
                    $message.classList.add('error')
                    $message.innerText = 'Une erreur est survenue, merci de réessayer.'
                }
            }
        
            // generate script
            var script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = 
                url + 
                '&c=document.MC_callback&FNAME=' + 
                encodeURIComponent($name.value) + 
                '&EMAIL=' + 
                encodeURIComponent($email.value)
        
            // append script to head    
            document.getElementsByTagName('head')[0].appendChild(script)
        }
        else {
            $message.classList.add('error')
            $message.classList.remove('success')
            
            if (!$name.value) {
                $name.classList.add('error')
                $message.innerText = 'Un nom est requis.'
            }
            else {
                $name.classList.remove('error')
            }
            if (!/@/.test($email.value)) {
                $email.classList.add('error')
                $message.innerText = 'Un email est requis.'
            }
            else {
                $email.classList.remove('error')
            }
        }
    });
}, false)