const RongIMLib = require('./lib/RongIMLib.miniprogram-1.0.8.js');
const RongIMClient = RongIMLib.RongIMClient;

const utils = require('./utils/utils.js');
const { UserListOld, GroupList, MusicList } = require('./mock.js');
let getUserList = () => {

  return [
    {
      "name": "令狐冲",
      "type": 1,
      "token": "/MJoeA9uebMRN1sgw5RBG/dZTx7PdYUozREvTAnwRf9J3bvOZzudLw8VeJKSJavWGHJAaYrhBxKwfU+DMdGa3f9TlajunykrRSb9e47gEb9BW5A6ni25PA==",
      "id": "RrG9ip8kykDX8Ucb54o6RF",
      "avatar": 'https://rongcloud-image.cn.ronghub.com/o_1chv06qgdb3r1bo52sd14121kos2g.png?e=2147483647&token=CddrKW5AbOMQaDRwc3ReDNvo3-sL_SO1fSUBKV3H:D8XdePuWt2l_ocWPOciTv23A0ZM='
    },
    {
      "name": "钢铁侠",
      "type": 1,
      "token": "CxNKWz7/qR7RayXPGJhZYfdZTx7PdYUozREvTAnwRf9J3bvOZzudL1aCF9m4T2lpY6r6aiFyHY3Sqvu5XF89r2GvwRBgeuQPcqNfpdmqDNIQjxHDaNeIcA==",
      "id": "cErbKoAFzTR5ggRXvtXRe8",
      "avatar": 'https://rongcloud-image.cn.ronghub.com/o_1chv06qgd8giqv91m0trahjqk2h.png?e=2147483647&token=livk5rb3__JZjCtEiMxXpQ8QscLxbNLehwhHySnX:0k0dha_ge3PY_ulet_aAqs4L1sY='
    },
    {
      "name": "方世玉",
      "type": 1,
      "token": "ES4jQ8Duny1nECDRaQAhny1ix7+icoIILQcERSlglyUdFsfenIjamryGjpASzjs4dTu7rqE+1CkFnSAXb4e3TDKcCc4peAr8UJhsTriftQCP2zsg1RksMA==",
      "id": "fxpEfJLSiQKs6q84Qq9qDb",
      "avatar": 'https://rongcloud-image.cn.ronghub.com/o_1chv06qgd1ak71kdu1k6op2t103f2i.png?e=2147483647&token=CddrKW5AbOMQaDRwc3ReDNvo3-sL_SO1fSUBKV3H:lHDtuo563HNREFDacKQAIAAIhe4='
    },
    {
      "name": "乔峰",
      "type": 1,
      "token": "8LzPThwGUkfQKonmJKvDf/dZTx7PdYUozREvTAnwRf9J3bvOZzudL5mv8FU11hfGNb9oNec+b7dtjAinlUhEQMm3irRB0zSi8t3qbQO95eJ70jolti2j4w==",
      "id": "wty6o4czCfJJVewoo8ZMVd",
      "avatar": 'https://rongcloud-image.cn.ronghub.com/o_1chv06qgd1pd81dof1rfk2iigh12k.png?e=2147483647&token=CddrKW5AbOMQaDRwc3ReDNvo3-sL_SO1fSUBKV3H:krcSARK9Z7HQQ_Ms5mOwO5VBfD8='
    },
    {
      "name": "段誉",
      "type": 1,
      "token": "YCbyiVPKymX/oxoWIiJ+BPcFEj/RLmpkrx4ybUerjDayYJ6YW+D4du7ZI2SJSo3ycSd/+eqWrjhAUk1nsI7XredUKBcXSNj8ZMLcqFgeNPGrr7JFEivwIQ==",
      "id": "LJsGKuLDt9RDJfF9ocsYiU",
      "avatar": 'https://rongcloud-image.cn.ronghub.com/o_1chv06qgd14q27cq1osbb6a1qjn2l.png?e=2147483647&token=livk5rb3__JZjCtEiMxXpQ8QscLxbNLehwhHySnX:TIaQ6s1nDdCko5uhULJ9YASHk-A='
    },
    {
      "name": "欧阳老怪",
      "type": 1,
      "token": "Zl2qDaegjkoi+PRaUGslgfcFEj/RLmpkrx4ybUerjDayYJ6YW+D4dreuacUvbTPCklDWVpZWYfSK53fNOf3EyrNDuu9qIk8mXIG8S7Ni+36rr7JFEivwIQ==",
      "id": "EXbLykPL4hiVtjeXR4kaVQ",
      "avatar": 'https://rongcloud-image.cn.ronghub.com/o_1chv06qgdbha1qmdsfbnk768k2m.gif?e=2147483647&token=livk5rb3__JZjCtEiMxXpQ8QscLxbNLehwhHySnX:ENqb2H3lpi3QZMR8JpiBdMKI-Wk='
    },
    {
      "name": "大乔",
      "type": 1,
      "token": "l63Q6cfIJMxnMPdnUI2PPvcFEj/RLmpkrx4ybUerjDayYJ6YW+D4drxpb6HxbppsjpmauHayK/6mZ8hZubbuqOz8DzYe0oytxWcf+fXEUeVphp4lZEncIw==",
      "id": "sGeoY8rtMyetdQxMx9XK9H",
      "avatar": 'https://rongcloud-image.cn.ronghub.com/o_1chv06qgdmlil2p1fsjoud2p2j.png?e=2147483647&token=livk5rb3__JZjCtEiMxXpQ8QscLxbNLehwhHySnX:OwYp2XRN_rODjcj_-3tCTmHj31I='
    },
    {
      "name": "小乔",
      "type": 1,
      "token": "PTgbY/GH8VB+6qQXFyjv+/cFEj/RLmpkrx4ybUerjDayYJ6YW+D4du51rvLuLpxWekJV9k3Sxg5h9FwVHHg7zxgMneFEEwFyfnD2h55j1RsWIyN9cyFSdw==",
      "id": "SjbPV6tKnDix6UvfDrx7T7",
      "avatar": 'https://rongcloud-image.cn.ronghub.com/o_1chv06qgds6p1ldl1jjhmlljnm2n.png?e=2147483647&token=CddrKW5AbOMQaDRwc3ReDNvo3-sL_SO1fSUBKV3H:KaQM4_no7pUQZGCrC2DpRbFCLAE='
    },
    {
      "name": "楚霸王",
      "type": 1,
      "token": "BjfDVKpFIT2i27xjGOqiwPdZTx7PdYUozREvTAnwRf9J3bvOZzudLwsgTg8CJdh6wOKNqUpKR3HOQUIAYj4mK0J7Vr9B93xowypKpsaTNmACcCkEArZafw==",
      "id": "FmkoLWc8R45zAocuB9JKNn",
      "avatar": 'https://rongcloud-image.cn.ronghub.com/o_1chv06qgd1ujiqu0865gqe1tkm2o.png?e=2147483647&token=livk5rb3__JZjCtEiMxXpQ8QscLxbNLehwhHySnX:P8F7S5l-TvhaF8nrAscsKZw1Xr4='
    }
  ]
};
let UserList = getUserList();
let imInstance = null;
let currentUser = null;

let config = {
  appkey: 'vnroth0kv8djo',
  url: '',
  wsScheme: 'wss://',
  protocol: 'https://'
};


let registerMessages = () => {
  let messageName = "MusicMessage"; 
  let objectName = "seal:music";
  let mesasgeTag = new RongIMLib.MessageTag(true, true); 
  let prototypes = ["url", "name", "author", "poster"]; 
  RongIMClient.registerMessageType(messageName, objectName, mesasgeTag, prototypes);
};
let registerCardMessages = () => {
  let messageName = "CardMessage";
  let objectName = "seal:card";
  let mesasgeTag = new RongIMLib.MessageTag(true, true);
  let prototypes = ["url", "name", "author", "poster"];
  RongIMClient.registerMessageType(messageName, objectName, mesasgeTag, prototypes);
};

let ErrorInfo = {
  4: {
    code: 4,
    msg: 'Appkey、Token 不匹配'
  },
  3: {
    code: 3,
    msg: '网络不可用'
  }
};
function ObserverList() {
  var checkIndexOutBound = function (index, bound) {
    return index > -1 && index < bound;
  };

  this.observerList = [];

  this.add = function (observer, force) {
    if (force) {
      this.observerList.length = 0;
    }
    this.observerList.push(observer);
  };

  this.get = function (index) {
    if (checkIndexOutBound(index, this.observerList.length)) {
      return this.observerList[index];
    }
  };

  this.count = function () {
    return this.observerList.length;
  };

  this.removeAt = function (index) {
    checkIndexOutBound(index, this.observerList.length) && this.observerList.splice(index, 1);
  };

  this.remove = function (observer) {
    if (!observer) {
      this.observerList.length = 0;
      return;
    }
    var observerList = Object.prototype.toString.call(observer) === '[object Function]' ? [observer] : observer;
    for (var i = 0, len = this.observerList.length; i < len; i++) {
      for (var j = 0; j < observerList.length; j++) {
        if (this.observerList[i] === observerList[j]) {
          this.removeAt(i);
          break;
        }
      }
      // if (this.observerList[i] === observer[i]) {
      //     this.removeAt(i);
      //     break;
      // }
    }
  };

  this.notify = function (val) {
    for (var i = 0, len = this.observerList.length; i < len; i++) {
      this.observerList[i](val);
    }
  };

  this.indexOf = function (observer, startIndex) {
    var i = startIndex || 0,
      len = this.observerList.length;
    while (i < len) {
      if (this.observerList[i] === observer) {
        return i;
      }
      i++;
    }
    return -1;
  };
}

let Friend = {};

Friend.getList = () => {
  return Promise.resolve(utils.filter(UserList, (friend) => {
    return (friend.id != currentUser.id);
  }));
};

let User = {};

let getUserIndex = (name, max) => {
  console.log(utils.toUnicode(name));
  var index = utils.toUnicode(name).slice(-1);
  //转 unicode 后最后一个字符不是数字，给固定🈯值
  if (isNaN(index)){
    index = max;
  }
  if (index > max){
    index = max;
  }
  return index;
};

let getUser = (user) => {
  user = utils.rename(user, {avatarUrl: 'avatar', nickName: 'name'});
  let maxIndex = UserList.length - 1;
  let index = getUserIndex(user.name,  maxIndex);
  let _user = UserList[index];
  // utils.extend(_user, user);
  return _user
};

let getUserById = (id) => {
  let { name, avatar} = utils.find(UserList, (user) => {
    return (id == user.id);
  });
  return {
    name,
    avatar
  };
};

User.getToken = (user) => {
  currentUser = getUser(user);
  return Promise.resolve(currentUser);
};

let bindSender = (message, position) => {
  if (!utils.isArray(message)) {
    message = [message];
  }
  let getSender = {
    1: (msg) => {
      msg.sender = utils.find(UserList, (user) => {
        return (user.id == msg.senderUserId);
      });
    },
    3: (msg) => {
      msg.sender = utils.find(UserList, (user) => {
        return (user.id == msg.senderUserId);
      });
    }
  };
  utils.map(message, (msg) => {
    msg.pos = position;
    getSender[msg.conversationType](msg);
    utils.formatMessage(msg);
    return msg;
  });
};

let Message = {
  watcher: new ObserverList(),
  _push: (message) => {
    //不处理离线消息
    if(message.offLineMessage){
      return;
    }
    bindSender(message);
    Message.watcher.notify(message);
  }
};


let sendMessage = (type, targetId, message) => {
  let bindUser = (_msg, next) => {
    bindSender(_msg);
    next(_msg);
  };

  return new Promise((resolve, reject) => {
    let { name, avatar } = currentUser;
    let user = {
      name,
      avatar
    };

    let messageMap = {
      text: () => {
        let {content} = message;
        return new RongIMLib.TextMessage({ content, user });
      },
      image: () => {
        let { content, imageUri, extra } = message;
        return new RongIMLib.ImageMessage({ content, imageUri, user, extra });
      },
      voice: () => {
        let { content, duration } = message;
        return new RongIMLib.VoiceMessage({ content, duration, user });
      },
      music: () => {
        let {name, url, author, poster} = message;
        return new RongIMClient.RegisterMessage.MusicMessage({ name, url, author, poster, user});
      }
    };

    let msg = messageMap[message.type]();
    imInstance.sendMessage(+type, targetId, msg, {
      onSuccess: result => {
        console.warn('service promise sendmessage success: ', msg);
        bindUser(result, resolve);
      },
      onError: (error, result) => {
        console.warn('service promise sendmessage error: ', error);
        //bindUser(message, reject);
      }
    });
  });
};

//params.type
//params.targetId
//params.content  
Message.sendText = (params) => {
  let {type, targetId, content} = params;
  return sendMessage(type, targetId, {
    type: 'text',
    content
  })
};

//params.type
//params.targetId
//params.content 
//params.iamgeUri 
Message.sendImage = (params) => {
  let { type, targetId, content, imageUri, extra } = params;
  return sendMessage(type, targetId, {
    type: 'image',
    content,
    imageUri,
    extra
  })
};

//params.type
//params.targetId
Message.sendVoice = (params) => {
  let { type, targetId, content} = params;
  let data = utils.extend({ type: 'voice' }, content);
  return sendMessage(type, targetId, data)
};

let getMusic = () => {
  let len = MusicList.length;
  let index = Math.floor(Math.random() * len);
  return MusicList[index];
};
Message.sendMusic = (params) => {
  let { type, targetId } = params;
  let content = utils.extend({ type: 'music' }, getMusic());
  return sendMessage(type, targetId, content);
};

// params.type 
// params.targetId
// params.position 0/1
Message.getList = (params) => {
  let {type, targetId, position, count} = params;
  count = count || 5;
  return new Promise((resolve, reject) => {
    let timestamp = position > 0 ? null : position;
    imInstance.getHistoryMessages(+type, targetId, timestamp, count, {
      onSuccess: (messageList, hasMore) => {
        // 过滤未处理的消息类型
        messageList = messageList.filter((message) => {
          return message.messageType != 'RecallCommandMessage'
        });
        bindSender(messageList, position);
        hasMore = !!hasMore;
        resolve({ messageList, hasMore});
      },
      onError: (error) => {
        console.error('gethistoryMessages', error);
        reject(error);
      }
    });
  });
};

Message.create = (params) => {
  let {name, type, targetId, content} = params;
  let message = {
    messageType: name,
    conversationType: type,
    targetId: targetId,
    senderUserId: currentUser.id,
    content: content,
    messageDirection: 1,
    messageUId: 'M' + Date.now(),
    sentTime: Date.now()
  };
  bindSender(message);
  return message;
};

Message.watch = (watch) => {
  Message.watcher.add(watch);
};

let Conversation = {
  watcher: new ObserverList()
};

let bindUserInfo = (list) => {
  let unknowUser = {
    name: '火星人',
    avatar: 'https://rongcloud-image.cn.ronghub.com/FjGxbmdZ7wyIqMHvaa3SqOgSZGk_?e=2147483647&token=CddrKW5AbOMQaDRwc3ReDNvo3-sL_SO1fSUBKV3H:OCCilgLZtkK8G9AmayjUzP9J66w='
  };
  let unknowGroup = {
    name: '火星群组',
    avatar: 'https://rongcloud-image.cn.ronghub.com/FjGxbmdZ7wyIqMHvaa3SqOgSZGk_?e=2147483647&token=CddrKW5AbOMQaDRwc3ReDNvo3-sL_SO1fSUBKV3H:OCCilgLZtkK8G9AmayjUzP9J66w='
  };
  if (!utils.isArray(list)){
    list = [list];
  }

  let infoMap = {
      1: (conversation) => {
        conversation.target = utils.find(UserList, (user) => {
          return user.id == conversation.targetId
        }) || unknowUser;
      },
      2: (conversation) => {
        conversation.target = unknowUser;
      },
      3: (conversation) => {
        conversation.target = utils.find(GroupList, (group) => {
          return group.id == conversation.targetId
        }) || unknowGroup;
      },
      10: (conversation) => {
        conversation.target = unknowUser;
      }
  };
  let formatMsg = (msg) => {
    let {messageType} = msg;
    let content = '[此消息类型未解析]';
    if (messageType == 'TextMessage'){
      content = msg.content.content;
    }
    if (messageType == 'VoiceMessage') {
      content = '[语音]';
    }
    if (messageType == 'ImageMessage') {
      content = '[图片]';
    }
    if (messageType == 'FileMessage') {
      content = '[文件]';
    }
    if (messageType == 'MusicMessage') {
      content = '[音乐]';
    }
    return content;
  };
  utils.map(list, (conversation) => {
    let {sentTime} = conversation;
    conversation._sentTime = utils.getTime(sentTime);
    conversation.unReadCount = conversation.unreadMessageCount;
    let { latestMessage } = conversation;
    conversation.content = formatMsg(latestMessage);
    let _type = conversation.conversationType;
    _type = _type > 3 ? 10 : _type;
    infoMap[_type](conversation);
  });

};

Conversation.clearUnreadCount = (conversation) => {
  let { conversationType, targetId } = conversation;
  imInstance.clearUnreadCount(conversationType, targetId, {
    onSuccess: function(){},
    onError: function(){}
  });
};
Conversation.watch = (watcher) => {
  RongIMClient.Conversation.watch(function(list){
    bindUserInfo(list);
    watcher(list);
  });
};
let Status = {
  watcher: new ObserverList()
};
Status.disconnect = () => {
  RongIMClient.getInstance().disconnect();
};
Status.connect = (user) => {
  console.log(user);
  RongIMClient.setConnectionStatusListener({
    onChanged: (status) => {
      Status.watcher.notify(status);
    }
  });

  let receiveMessage = (message) => {
    console.log(message);
      let {messageType} = message;
      let messageCtrol = {
        otherMessage: () => {
          Message._push(message);
        }
      };
      let messageHandler = messageCtrol[messageType] || messageCtrol.otherMessage;
      messageHandler();
  };
  RongIMClient.setOnReceiveMessageListener({
    onReceived: receiveMessage
  });

  return User.getToken(user).then((user) => {
    return new Promise((resolve, reject) => {
      RongIMClient.connect(user.token, {
        onSuccess: (userId) => {
          resolve(userId);
        },
        onTokenIncorrect: () => {
          var msg = ErrorInfo[RongIMLib.ConnectionState.TOKEN_INCORRECT];
          reject(msg);
        },
        onError: (error) => {
          console.log('eeeeaaaa', error);
          var msg = ErrorInfo[RongIMLib.ConnectionState.TOKEN_INCORRECT] || {
            code: error,
            msg: error
          };
          reject(msg);
        }
      });
    });
  });
};

Status.watch = (watch) => {
  var force = true;
  Status.watcher.add(watch, force);
};

let File = {};

File.upload = (file) => {
  let fileType = RongIMLib.FileType.FILE;
  return new Promise((resolve, reject) => {
    imInstance.getFileToken(fileType, {
      onSuccess: (result) => {
        let { token } = result;
        wx.uploadFile({
          url: 'https://up.qbox.me',
          filePath: file.path,
          name: 'file',
          formData: {
            token: token
          },
          success: function (res) {
            var data = res.data
            var result = JSON.parse(data);
            var hash = result.hash;
            imInstance.getFileUrl(fileType, hash, 'vioce.mp3', {
              onSuccess: (file) => {
                resolve(file);
              },
              onError: (error) => {
                console.log('upload file, getFileURL:', error);
              }
            });
          }
        })
      },
      onError: (error) => {
        console.log('upload file: ', error);
      }
    });
  });
};

let modules = {
  User,
  Message,
  Conversation,
  Friend,
  Status,
  File,
  ConnectionStatus: RongIMLib.ConnectionStatus
};
module.exports = (_config) => {
  utils.extend(config, _config);
  RongIMClient.init(config.appkey, null, {
    navi: config.navi,
    cmp: config.cmp,
    wsScheme: config.wsScheme,
    protocol: config.protocol
  });
  registerMessages();
  registerCardMessages();
  imInstance = RongIMClient.getInstance();
  return modules;
};
