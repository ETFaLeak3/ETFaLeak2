<script lang="ts">
    import Navbar from '@/lib/components/ui/navbar/navbar.svelte';
</script>

<main class="w-full h-screen bg-white dark:bg-black">
    <Navbar title={true} link={false} avatar={true} />
    <div
        class="w-full h-full flex flex-col items-center justify-center gap-12 p-10"
    >
        <h1 class="text-4xl font-extrabold">Menu de jeu</h1>
        <div class="flex flex-col items-center gap-12 w-full h-full">
            <button
                class="text-2xl w-full rounded-xl bg-slate-500 hover:bg-slate-700 h-20 hover:h-1/2 transition-all duration-200 flex flex-col items-center justify-center text-white font-bold group gap-3 p-4"
                onclick={() => {
                    window.location.href = '/brain';
                }}
                >Cerveau

                <p class="hidden group-hover:block font-normal">
                    Le dieu Thalassor a de la fièvre. En effet, la température
                    des océans a augmenté de 15°C. La cause ? Une espèce de raie
                    à la température corporelle très élevée qui prolifère dans
                    les eaux du monde entier. Incarnez un requin génétiquement
                    modifié pour résoudre ce problème et sauvez les océans !
                    Utilisez les flèches du clavier pour vous déplacer, et la
                    touche entrée pour sélectionner des améliorations.
                </p>
                <p class="hidden group-hover:block font-normal">
                    Le cerveau humain gère tout dans notre corps, notamment le
                    contrôle de la température corporelle. Quand notre
                    température monte c'est que nous sommes malade. Il en est de
                    même pour les océans, leur température à augmenté ces
                    dernières années et cela impacte la faune et la flore marine
                    négativement. Il faut donc essayer de limiter cette hausse
                    de la température.
                </p>
            </button>

            <button
                class="text-2xl w-full rounded-xl bg-slate-500 hover:bg-slate-700 h-20 hover:h-1/2 transition-all duration-200 flex flex-col items-center justify-center text-white font-bold group gap-3 p-4"
                onclick={() => {
                    window.location.href = '/poumons';
                }}
                >Poumons

                <p class="hidden group-hover:block font-normal">
                    Les poumons de Thalassor sont envahis par des algues
                    toxiques, qui prolifèrent à cause de l'acidification des
                    océans. Si ces algues ne sont pas nettoyées rapidement,
                    elles risquent de contaminer toute la flore qui s'y trouve.
                    Cliquez sur les algues rouges pour les mettre hors d'état de
                    nuire avant qu'elles ne s'attaquent aux algues vertes.
                </p>

                <p class="hidden group-hover:block font-normal">
                    Certaines espèces d'algues peut être invasives, ces algues
                    recouvrent les fonds marins et étouffent la faune et la
                    flore marine. Protéger les fonds marins de ces espèces qui
                    détruisent les écosystèmes est primordial pour notre
                    planète, de la même manière que protéger nos poumons de
                    substances nocives est très important pour vivre en bonne
                    santé.
                </p>
            </button>

            <button
                class="text-2xl w-full rounded-xl bg-slate-500 hover:bg-slate-700 h-20 hover:h-1/2 transition-all duration-200 flex flex-col items-center justify-center text-white font-bold group gap-3 p-4"
                onclick={() => {
                    window.location.href = '/race';
                }}
                >Peau

                <p class="hidden group-hover:block font-normal">
                    Le dieu Thalassor a un mauvais cas de peau sèche. En effet,
                    sa peau est couverte de squames et a perdu toute trace
                    d'hydratation. Incarnez un poisson pris au piège dans une
                    partie asséchée de l'océan pour l'aider à regagner l'eau.
                    Naviguez à travers les obstacles en utilisant les flèches du
                    clavier et cliquez le plus vite possible avec votre souris
                    pour prendre de la vitesse !
                </p>
                <p class="hidden group-hover:block font-normal">
                    Les planctons participent grandement à la filtration des
                    impuretés dans les océans, leur destruction est donc très
                    nocive pour l'environnement. On peut comparer leur action à
                    celle des reins, qui filtrent eux aussi les impuretés de
                    notre corps.
                </p>
            </button>

            <button
                class="text-2xl w-full rounded-xl bg-slate-500 hover:bg-slate-700 h-20 hover:h-1/2 transition-all duration-200 flex flex-col items-center justify-center text-white font-bold group gap-3 p-4"
                onclick={() => {
                    window.location.href = '/shrimpyshot';
                }}
                >Estomac

                <p class="hidden group-hover:block font-normal">
                    Le dieu Thalassor est indisposé. Son estomac est rempli
                    d'impuretés qui ne manquent pas de troubler le quotidien de
                    Béatrice, une crevette mantisse qui a la capacité de tirer
                    des bulles d'air. Aidez-la à tirer profit de ses capacités
                    pour nettoyer l'estomac de Thalassor en éliminant les sacs
                    plastiques ! Utilisez la barre espace pour gagner de la
                    hauteur et la touche S pour tirer.
                </p>
                <p class="hidden group-hover:block font-normal">
                    Le plastique présent dans les océans est un fléau pour la
                    faune comme pour la flore. Il s'accroche partout et
                    contamine presque toutes les espèces, sans même parler des
                    microplastiques. Ce serait comme avoir des morceaux solides
                    indigestibles dans notre estomac, il nous faut donc éviter
                    de déverser plus de plastique dans les océans.
                </p>
            </button>
        </div>
    </div>
</main>
