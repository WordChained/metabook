import axios from 'axios'

const _randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
const _randomId = (length) => {
    let text = "";
    let possible = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPUVWXYZ";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

const getRandomUser = async () => {
    try {
        const user = await axios.get('https://randomuser.me/api/')
        const post = _insertRandomPost()
        const postMap = new Map([[post.postId, { postText: post.text, postDate: post.date, media: post.media, engagement: post.engagement }]])
        let postObj = Array.from(postMap).reduce((obj, [key, value]) => (
            Object.assign(obj, { [key]: value }) // Be careful! Maps can have non-String keys; object literals can't.
        ), {});
        user.data.results[0].posts = [postObj]
        return user.data.results[0]
    } catch (error) {
        console.log(error);
    }
}

const _insertRandomPost = () => {
    const randNum = Math.random()
    const post = { postId: _randomId(10) }
    const randomDate = _randomDate(new Date(2012, 9, 9), new Date())
    if (randNum <= 0.3) {
        post.text = 'This is a post'
        post.media = 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'
        post.engagement = {
            reactions: { likes: ['123abc'], angry: ['123abc', '456def'], love: ['123abc'], sad: ['123abc'] },
            comments: {
                'comment123': {
                    userId: '123abc', text: 'blo blo blo', media: 'foobar.png', date: randomDate,
                    comments: {

                    },
                    reactions: {
                        likes: ['456def'], angry: [], love: [], sad: []
                    }
                },
                'comment456': {
                    userId: '123abc', text: 'bla bla bla', media: 'foobar.png', date: randomDate,
                    comments: {

                    },
                    reactions: {
                        likes: ['123abc'], angry: [], love: [], sad: []
                    }
                },
            }
        }
    } else if (randNum >= 0.3 && randNum <= 0.6) {
        post.text = 'This is yet another post'
        post.media = 'https://image.shutterstock.com/image-vector/check-back-soon-hand-lettering-600w-1379832464.jpg'
        post.engagement = {
            reactions: { likes: ['123abc'], angry: ['123abc', '456def'], love: ['123abc'], sad: ['123abc'] },
            comments: {
                'comment123': {
                    userId: '456def', text: 'blo blo blo', media: 'foobar.png', date: randomDate,
                    comments: {

                    },
                    reactions: {
                        likes: ['456def'], angry: [], love: [], sad: []
                    }
                },
                'comment456': {
                    userId: '123abc', text: 'bla bla bla', media: 'foobar.png', date: randomDate,
                    comments: {

                    },
                    reactions: {
                        likes: ['123abc'], angry: [], love: [], sad: []
                    }
                },
            }
        }
    } else {
        post.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac faucibus tortor, in suscipit justo. Fusce lacinia hendrerit sem non facilisis. Mauris dapibus pharetra elit. Vivamus augue tellus, scelerisque sed velit vitae, tempor pharetra est. Maecenas non orci ut mauris porttitor vulputate a ac metus. Morbi at erat sed neque bibendum vulputate eget vitae nunc. In interdum neque quis mollis suscipit. Donec at placerat velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec tempor libero et urna consectetur pretium in quis nibh.\n Vivamus porta est quis velit pulvinar, vitae egestas nunc efficitur.Nulla facilisi.Etiam id felis nec velit porta fermentum.Integer venenatis tristique leo at faucibus.Pellentesque scelerisque rhoncus dolor, sit amet lobortis nisl maximus et.\n Suspendisse a eros ornare, convallis tortor quis, tempus quam.Aenean iaculis convallis auctor.Mauris maximus diam quis ultrices pretium.Vestibulum neque nibh, blandit nec porttitor et, egestas sit amet tortor.In ac euismod leo, nec porta urna.Nulla eu maximus dui. Etiam non eros lorem.Mauris porta quam sit amet quam euismod tincidunt."
        post.media = 'https://image.shutterstock.com/image-photo/teenage-girl-dyed-purple-hair-600w-2056614533.jpg'
    }
    post.date = randomDate
    post.engagement = {
        reactions: { likes: ['123abc'], angry: ['123abc', '456def'], love: ['123abc'], sad: ['123abc'] },
        comments: {
            'comment123': {
                userId: '456def', text: 'blo blo blo', media: 'foobar.png', date: randomDate,
                comments: {

                },
                reactions: {
                    likes: ['456def'], angry: [], love: [], sad: []
                }
            },
            'comment456': {
                userId: '123abc', text: 'bla bla bla', media: 'foobar.png', date: randomDate,
                comments: {

                },
                reactions: {
                    likes: ['123abc'], angry: [], love: [], sad: []
                }
            },
        }
    }
    return post
}

const getMockUser = () => {
    return {
        someUserId123: {
            name: { 'first': 'bobo', 'middle': 'yaron', 'last': 'cohen', 'title': 'Mr' },
            DOB: { 'day': 21, 'month': 6, 'year': 1992, 'fullDate': 'TIMESTAMP' },
            profilePicture: 'foo.png',
            address: { lang: '32.085300', long: '34.781769' },//Tel Aviv
            careerInfo: {},
            educationInfo: {}
            ,
            activity: {
                //     posts: { POST_MAP: {} }, comments: { COMMENT_MAP: {} }, reactions: {
                //         reactionId123: {
                //             type: 'like/love/sad/etc..',
                //             date: 'TIMESTAMP',
                //             targetType: 'post/comment/image/video/note/etc...'
                //         }
                //     },
                //     media: {
                //         images: { IMAGE_MAP: {} },
                //         videos: { VIDEO_MAP: {} }
                //     }
            },
        }
    }
}
export const usersApi = {
    getRandomUser,
    getMockUser
}

// posts:
const posts = {
    'postId123': {
        text: 'This is yet another post',
        media: 'https://image.shutterstock.com/image-vector/check-back-soon-hand-lettering-600w-1379832464.jpg',
        engagement: {
            reactions: { likes: ['123abc'], angry: ['123abc', '456def'], love: ['123abc'], sad: ['123abc'] },
            comments: {
                'comment123': {
                    userId: '456def', text: 'blo blo blo', media: 'foobar.png', date: 'date',
                    comments: {

                    },
                    reactions: {
                        likes: ['456def'], angry: [], love: [], sad: []
                    }
                },
                'comment456': {
                    userId: '123abc', text: 'bla bla bla', media: 'foobar.png', date: 'date',
                    comments: {

                    },
                    reactions: {
                        likes: ['123abc'], angry: [], love: [], sad: []
                    }
                },
            }
        }
    },
    'postId456': {
        text: '',
        media: '',
        engagement: {
            reactions: { likes: [], angry: [], love: [], sad: [] },
            comments: {
                'comment123': {
                    userId: '', text: '', media: '', date: '',
                    comments: {

                    },
                    reactions: {
                        likes: [], angry: [], love: [], sad: []
                    }
                },
            }
        }
    }
}

const postMapExample = {
    "_id": {
        "$oid": "61eed9fcb0cf7f62f081d697"
    },
    "text": "first post from mongoDB",
    "media": "",
    "engagement": {
        "reactions": {
            "likes": [],
            "angry": [],
            "love": [],
            "sad": []
        },
        "comments": {
            "61eed9ocb0cf1f623081d697": {
                "userId": "",
                "text": "",
                "media": "",
                "date": "",
                "reactions": {
                    "likes": [],
                    "angry": [],
                    "love": [],
                    "sad": []
                },
                "comments": {}
            }
        }
    }
}