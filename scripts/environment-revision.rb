buildid = File.new("src/env.ts", "w+")

if buildid
    push "Running 'git rev-parse HEAD'"
    revision = `git rev-parse HEAD`.gsub("\n", "")

    push "Running 'git remote'"
    remote = `git remote`.gsub("\n", "")

    push "Running 'git branch --show-current'"
    branch = `git branch --show-current`.gsub("\n", "")

    push "Running 'git remote get-url #{remote}'"
    remote_url = `git remote get-url #{remote}`.gsub("\n", "")

    buildid.syswrite(
"export const BUILD_REVISION = \"#{revision}\"
export const BUILD_BRANCH = \"#{branch}\"
export const BUILD_REMOTE_URI = \"#{remote_url}\""
)
    puts "Written current build environment to file."
else
    puts "Not able to access the file"
end