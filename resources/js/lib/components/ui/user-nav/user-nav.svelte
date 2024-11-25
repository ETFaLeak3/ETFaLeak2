<script lang="ts">
	import { inertia,page } from "@inertiajs/svelte";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

	let profile = $page.props.auth.user;

    let user = {
        email: profile.email,
        username: profile.name,
        avatar: '/avatars/'+ profile.id + '.webp' + '?' + Date.now()
    }

	$: {
		profile = $page.props.auth.user;

		user = {
                email: profile.email,
                username: profile.name,
                avatar: '/api/user/avatar/' + profile.id + '?' + Date.now()
            }
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button variant="ghost" class="relative size-12 rounded-full">
			<Avatar.Root class="size-12">
				<Avatar.Image src={user.avatar} alt={user.username} />
				<Avatar.Fallback>{user.username.slice(0, 2).toUpperCase()}</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{user.username}</p>
				<p class="text-muted-foreground text-xs leading-none">{user.email}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<a href='/profile' class="w-full">Profile</a>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			<a href='/logout' class="w-full" use:inertia={{ href: '/logout', method: 'post' }}>Se déconnecter</a>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>