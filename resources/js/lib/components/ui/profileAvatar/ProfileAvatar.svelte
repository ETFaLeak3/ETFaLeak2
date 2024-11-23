<script lang="ts">
    import { router } from '@inertiajs/svelte';
    import * as Avatar from "$lib/components/ui/avatar";
    import Pencil from "lucide-svelte/icons/pencil";
    import { toast } from "svelte-sonner";

    let {
        src,
        alt,
        fallback,
    }: { src: string | null | undefined, alt: string | null | undefined, fallback: string | null | undefined } = $props();

    function updateAvatar(e: Event) {
        const file = e.target?.files[0];
        router.post("/api/user/avatar", {
            avatar: file,
        });
    }
</script>

<div class="flex flex-col items-center">
    <Avatar.Root class="size-20">
        <Avatar.Image src={src ? src : null} alt={alt ? alt : null}/>
        <Avatar.Fallback>{fallback}</Avatar.Fallback>
    </Avatar.Root>
    <input type="file" name="file" id="file" accept="image/png, image/jpeg, image/webp" oninput={(e) => {updateAvatar(e)}} class="w-0 h-0 opacity-0 overflow-hidden absolute z-[-1]"/>
    <div class="bg-white border border-black w-fit h-fit p-1 rounded-full cursor-pointer relative -top-6 -right-5">
        <label for="file" class="w-fit"><Pencil class="text-black size-4 cursor-pointer"/></label>
    </div>
</div>
