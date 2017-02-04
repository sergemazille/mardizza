# config valid only for current version of Capistrano
lock '3.6.1'

set :application, 'Mardizza'
set :repo_url, 'https://github.com/sergemazille/mardizza.git'
set :keep_releases, 5
set :use_sudo, true
set :writable_dirs, ["var/cache", "var/logs"]
set :permission_method, :chown
set :ssh_options, {:forward_agent => true}

append :linked_dirs, 'node_modules', 'var/sessions', 'web/assets/files', 'web/.well-known'
append :linked_files, 'app/config/parameters.yml'

namespace :deploy do
    after :updated, :installation_perso do
        on roles(:web) do
            within release_path do
                execute :composer, :install
                #execute :npm, :install
                execute :gulp, :deploy
            end
        end
    end

    after :cleanup, :clean_var do
        on roles(:web) do
            within release_path do
                execute :chmod, '777', '-R', 'var/'
            end
        end
    end
end


