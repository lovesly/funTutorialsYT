/* eslint-disable */
$(document).ready(function() {
    $('#searchUser').on('keyup', function(e) {
        var username = e.target.value;

        // ajax request to github
        $.ajax({
            url: `https://api.github.com/users/${username}`,
            data: {
                client_id: 'fa9f5b53c1d8ef8877c7',
                client_secret: '42c6b698c582c737c3b3b03ed305ee6dc2d469ca',
            }
        }).done(function(user) {
            $.ajax({
                url: `https://api.github.com/users/${username}/repos`,
                data: {
                    client_id: 'fa9f5b53c1d8ef8877c7',
                    client_secret: '42c6b698c582c737c3b3b03ed305ee6dc2d469ca',
                }
            }).done(function(repos) {
                $.each(repos, function(index, repo) {
                    console.log(repo);
                    $('#repos').append(`
                        <div class="card">
                            <div class="card-body row">
                                <div class="col-md-7">
                                    <strong>${repo.name}</strong>: ${repo.description}
                                </div>
                                <div class="col-md-3">
                                    <span class="badge badge-primary">Forks: ${repo.forks_count}</span>
                                    <span class="badge badge-success">Watchers: ${repo.watchers_count}</span>
                                    <span class="badge badge-danger">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                                </div>
                            </div>
                        </div><br>
                    `);
                });
            });
        
            $('#profile').html(`
                <div class="card">
                    <div class="card-header">
                        ${user.login}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Content title</h5>
                        <div class="row">
                            <div class="col-md-3">
                                <img class="thumbnail avatar" src="${user.avatar_url}">
                                <a class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
                            </div>
                            <div class="col-md-9">
                                <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                                <span class="badge badge-success">Public Gists: ${user.public_gists}</span>
                                <span class="badge badge-danger">Followers: ${user.followers}</span>
                                <span class="badge badge-warning">Following: ${user.following}</span>
                                <br>
                                <ul class="list-group">
                                    <li class="list-group-item">Company: ${user.company}</li>
                                    <li class="list-group-item">Website/blog: ${user.blog}</li>
                                    <li class="list-group-item">Location: ${user.location}</li>
                                    <li class="list-group-item">Member Since: ${user.created_at}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 class="page-header">Latest Repos</h3>
                <div id="repos"></div>
            `);
        });
    });
});