buildid = File.new("src/env.ts", "w+")

if buildid
    puts "Running 'git rev-parse HEAD'"
    revision = `git rev-parse HEAD`.gsub("\n", "")

    puts "Running 'git remote'"
    remote = ENV["VERCEL_GIT_COMMIT_REF"] || `git remote`.gsub("\n", "")

    puts "Running 'git branch --show-current'"
    branch = `git branch --show-current`.gsub("\n", "")

    if ENV["VERCEL"]
        git_provider = ENV["VERCEL_GIT_PROVIDER"]
        git_owner = ENV["VERCEL_GIT_REPO_OWNER"]
        git_repo = ENV["VERCEL_GIT_REPO_SLUG"]
        remote_url = "https://#{git_provider}.com/#{git_owner}/#{git_repo}"
    else
        puts "Running 'git remote get-url #{remote}'"
        remote_url = `git remote get-url #{remote}`.gsub("\n", "")
    end

    buildid.syswrite(
"export const BUILD_REVISION = \"#{revision}\"
export const BUILD_BRANCH = \"#{branch}\"
export const BUILD_REMOTE_URI = \"#{remote_url}\""
)
    puts "Written current build environment to file."
else
    puts "Not able to access the file"
end