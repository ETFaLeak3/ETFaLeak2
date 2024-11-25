<script lang="ts">
    import { page } from "@inertiajs/svelte";
    import { onMount } from "svelte";
    import { Layout } from "@/layouts";
    import { Navbar } from "@/lib/components/ui/navbar";
    import { toast } from "svelte-sonner";

    import ProfileAvatar from "$lib/components/ui/profileAvatar/ProfileAvatar.svelte";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";

    let profile = $page.props.auth.user;

    let user = {
        email: profile.email,
        username: profile.name,
        avatar: '/avatars/'+ profile.id + '.webp' + '?' + Date.now()
    }

    console.log(user);
    console.log($page);

    let mounted: boolean = false;

    onMount(() => {
        mounted = true;
    });

    $: {
        if (mounted){
            profile = $page.props.auth.user;

            user = {
                email: profile.email,
                username: profile.name,
                avatar: '/api/user/avatar/' + profile.id + '?' + Date.now()
            }

            if ($page.props.flash) {
                let status = $page.props.flash.status;
                let description: string | undefined = {
                    207: "Votre compte a été créé avec succès !",
                    208: "Vous avez été connecté avec succès !",
                    1003: "L'avatar a été modifié avec succès",
                    1106: "L'avatar est trop lourd (A définir)",
                    1107: "L'avatar n'est pas au bon format (jpeg, png ou webp)",
                    1108: "L'avatar est vide",
                }[status as number];

                if (description) {
                    let isError = status >= 1100;
                    toast[isError ? 'error' : 'success'](description);
                }
            }
        }
    }

</script>

<Layout>
    <Navbar title={true} link={true} />
    <main class="w-screen h-screen">
        <div class="max-w-5xl mx-auto px-4 flex items-center justify-center h-screen">
            <div
                class="sm:w-6/12 flex p-6 border rounded-md flex-col gap-8 items-center bg-[#f3f3f3] dark:bg-[#0e0e0e]"
            >
                <h1 class="text-2xl text-black dark:text-white font-bold">{user.username}</h1>
                <ProfileAvatar src={user.avatar} alt={user.username} fallback={user.username.slice(0, 2).toUpperCase()} />
                <div class="flex flex-row gap-4 w-full items-center">
                <Label>Email</Label>
                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={user.email}
                    readonly
                />
                </div>
                <div class="flex flex-row gap-4 w-full items-center">
                <Label>Username</Label>
                <Input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={user.username}
                    readonly
                />
                </div>
            </div>
        </div>
    </main>
</Layout>