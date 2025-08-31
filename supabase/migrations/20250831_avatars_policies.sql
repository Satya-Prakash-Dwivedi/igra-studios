-- Create the avatars bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Enable Row Level Security on storage.objects
alter table storage.objects enable row level security;

-- Drop existing policies (so re-running migration is safe)
drop policy if exists "Users can upload their own avatars" on storage.objects;
drop policy if exists "Users can update their own avatars" on storage.objects;
drop policy if exists "Users can read avatars" on storage.objects;
drop policy if exists "Users can delete their own avatars" on storage.objects;

-- Allow users to upload their own avatars
create policy "Users can upload their own avatars"
on storage.objects
for insert
with check (
  bucket_id = 'avatars'
  and auth.uid() = owner
);

-- Allow users to update their own avatars
create policy "Users can update their own avatars"
on storage.objects
for update
using (
  bucket_id = 'avatars'
  and auth.uid() = owner
);

-- Allow users to delete their own avatars
create policy "Users can delete their own avatars"
on storage.objects
for delete
using (
  bucket_id = 'avatars'
  and auth.uid() = owner
);

-- Allow everyone to read avatars
create policy "Users can read avatars"
on storage.objects
for select
using (bucket_id = 'avatars');
