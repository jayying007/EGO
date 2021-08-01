SET NAMES UTF8;
DROP DATABASE IF EXISTS ego;
CREATE DATABASE ego CHARSET=UTF8;
USE ego;

CREATE TABLE ego_aspect(
    aspectid int primary key auto_increment,
    name varchar(32)
);
create table ego_family(
    fid int primary key auto_increment,
    aspectid int,
    foreign key(aspectid) references ego_aspect(aspectid),
    title varchar(255),
    subtitle varchar(255),
    sold_count varchar(255),
    detail_text varchar(1024),
    product_pic varchar(1024),
    detail_pic varchar(1024)
);
create table ego_product(
    pid int primary key auto_increment,
    fid int,
    foreign key(fid) references ego_family(fid),
    price float,
    property varchar(1024),
    storage varchar(30)
);
create table ego_user(
    uid int primary key auto_increment,
    nickname varchar(128),
    upassword varchar(128),
    time bigint,
    email varchar(60),
    phone varchar(30),
    uname varchar(128),
    gender int
);
create table ego_product_comment(
    uid int,
    foreign key(uid) references ego_user(uid),
    fid int,
    foreign key(fid) references ego_family(fid),
    comment varchar(1024),
    time bigint
);
create table ego_user_address(
    aid int primary key auto_increment,
    uid int,
    foreign key(uid) references ego_user(uid),
    receiver varchar(128),
    phone varchar(30),
    province varchar(60),
    city varchar(60),
    county varchar(60),
    address varchar(25),
    postcode varchar(30),
    is_default int
);
create table ego_user_shopping_cart(
    cid int primary key auto_increment,
    uid int,
    foreign key(uid) references ego_user(uid),
    pid int,
    foreign key(pid) references ego_product(pid),
    count int
);
create table ego_user_order(
    oid int primary key auto_increment,
    uid int,
    foreign key(uid) references ego_user(uid),
    aid int,
    foreign key(aid) references ego_user_address(aid),
    status int,
    order_time bigint,
    pay_time bigint,
    deliever_time bigint,
    received_time bigint
);
create table ego_user_order_details(
    did int primary key auto_increment,
    oid int,
    foreign key(oid) references ego_user_order(oid),
    pid int,
    foreign key(pid) references ego_product(pid),
    count int
);

create table ego_index_carousel(
    cid int primary key auto_increment,
    fid int,
    foreign key(fid) references ego_family(fid),
    title varchar(64),
    img varchar(128)
);

create table ego_index_topSale(
    tid int primary key auto_increment,
    fid int,
    foreign key(fid) references ego_family(fid),
    title varchar(64),
    img varchar(128)
);

INSERT INTO `ego_user` (`nickname`, `upassword`) VALUES ('root', 'root');
insert into ego_aspect values(null,'jianshenfuzhuang');
insert into ego_aspect values(null,'jianshenhuju');
insert into ego_aspect values(null,'jianshenqicai');
insert into ego_aspect values(null,'jianshenshipin');
insert into ego_aspect values(null,'yundongxie');
insert into ego_family values(null,1,'秋冬运动长袖镂空修身瑜伽上衣速干弹力修身舞蹈上衣套指衣服装备','限前10000名29.6,卖完恢复原价39.6','141人付款','品牌:冠美劲采,功能:吸湿排汗速干透气,材质:涤纶,尺码:SL,颜色分类:红色黑色紫色粉色褐色,吊牌价:100,款号:CX438,上市时间:2019年夏季,袖长:长袖,衣长:及腰,服装版型:紧身,性别:女,运动户外项目:瑜伽舞蹈,是否商场同款:否','/pic/jianshenfuzhuang/A/product_pic/1.jpg,/pic/jianshenfuzhuang/A/product_pic/2.jpg,/pic/jianshenfuzhuang/A/product_pic/3.jpg','/pic/jianshenfuzhuang/A/detail_pic/1.jpg,/pic/jianshenfuzhuang/A/detail_pic/2.jpg,/pic/jianshenfuzhuang/A/detail_pic/3.jpg,/pic/jianshenfuzhuang/A/detail_pic/4.jpg,/pic/jianshenfuzhuang/A/detail_pic/5.jpg,/pic/jianshenfuzhuang/A/detail_pic/6.jpg,/pic/jianshenfuzhuang/A/detail_pic/7.jpg,/pic/jianshenfuzhuang/A/detail_pic/8.jpg');

insert into ego_family values(null,1,'HOTSUIT瑜伽裤女弹力紧身裤高腰高弹提臀力健身裤跑步运动长裤','吸湿排汗高弹修身赠送运费险','127人付款','品牌:HOTSUIT,功能:吸湿排汗透气超强弹性,尺码:SM,腰型:高腰,颜色分类:紫色黑色白色青色,吊牌价:770,款号:6853007,上市时间:2018年秋季,性别:女运动,户外项目:瑜伽器械健身,裤长:长裤,款式:紧身裤,是否商场同款:是','/pic/jianshenfuzhuang/B/product_pic/1.jpg,/pic/jianshenfuzhuang/B/product_pic/2.jpg,/pic/jianshenfuzhuang/B/product_pic/3.jpg,/pic/jianshenfuzhuang/B/product_pic/4.jpg','/pic/jianshenfuzhuang/B/detail_pic/1.jpg,/pic/jianshenfuzhuang/B/detail_pic/2.jpg,/pic/jianshenfuzhuang/B/detail_pic/3.jpg,/pic/jianshenfuzhuang/B/detail_pic/4.jpg,/pic/jianshenfuzhuang/B/detail_pic/5.jpg,/pic/jianshenfuzhuang/B/detail_pic/6.jpg,/pic/jianshenfuzhuang/B/detail_pic/7.jpg');

insert into ego_family values(null,1,'UnderArmour安德玛UA女子运动训练内衣-高强度-1311821','修身剪裁有助于长时舒适弹性拉伸','87人付款','品牌:UnderArmour/安德玛,功能:透气,尺码:32A34D38A38D,颜色分类:黑色,吊牌价:449,款号:1311821,上市时间:2018年春季,袖长:无袖,衣长:及胸,服装版型:紧身,性别:女运动,户外项目:瑜伽舞蹈器械健身,是否商场同款:是','/pic/jianshenfuzhuang/C/product_pic/1.jpg,/pic/jianshenfuzhuang/C/product_pic/2.jpg,/pic/jianshenfuzhuang/C/product_pic/3.jpg,/pic/jianshenfuzhuang/C/product_pic/4.jpg,/pic/jianshenfuzhuang/C/product_pic/5.jpg','/pic/jianshenfuzhuang/C/detail_pic/1.jpg,/pic/jianshenfuzhuang/C/detail_pic/2.jpg,/pic/jianshenfuzhuang/C/detail_pic/3.jpg,/pic/jianshenfuzhuang/C/detail_pic/4.jpg,/pic/jianshenfuzhuang/C/detail_pic/5.jpg,/pic/jianshenfuzhuang/C/detail_pic/6.jpg,/pic/jianshenfuzhuang/C/detail_pic/7.jpg,/pic/jianshenfuzhuang/C/detail_pic/8.jpg,/pic/jianshenfuzhuang/C/detail_pic/9.jpg');

insert into ego_family values(null,1,'BD健美站速干健身运动夏季圆领时尚无袖背心吸湿排汗透气修身背心','全场正品达人推荐无忧退换','19人付款','品牌:BODYDREAM,材质:涤纶,尺码:ML,图案:其他,适用性别:男,颜色分类:黑色,上市年份季节:2018年夏季,款式:其他/other','/pic/jianshenfuzhuang/D/product_pic/1.jpg,/pic/jianshenfuzhuang/D/product_pic/2.jpg,/pic/jianshenfuzhuang/D/product_pic/3.jpg,/pic/jianshenfuzhuang/D/product_pic/4.jpg','/pic/jianshenfuzhuang/D/detail_pic/1.jpg,/pic/jianshenfuzhuang/D/detail_pic/2.jpg,/pic/jianshenfuzhuang/D/detail_pic/3.jpg,/pic/jianshenfuzhuang/D/detail_pic/4.jpg,/pic/jianshenfuzhuang/D/detail_pic/5.jpg');

insert into ego_family values(null,1,'岚纹修身运动外套女高弹性速干瑜伽健身长袖显瘦拉链开衫跑步上衣','显瘦且舒适高弹性运动无阻','804人付款','上市时间:2018年春季,服装版型:常规,衣长:及腹,袖长:长袖,材质:氨纶,运动户外项目:瑜伽舞蹈器械健身,功能:吸湿排汗速干透气超强弹性,性别:女,颜色分类:粉色蓝色黑色,尺码:SLM','/pic/jianshenfuzhuang/E/product_pic/1.jpg,/pic/jianshenfuzhuang/E/product_pic/2.jpg,/pic/jianshenfuzhuang/E/product_pic/3.jpg,/pic/jianshenfuzhuang/E/product_pic/4.jpg,/pic/jianshenfuzhuang/E/product_pic/5.jpg','/pic/jianshenfuzhuang/E/detail_pic/1.jpg,/pic/jianshenfuzhuang/E/detail_pic/2.jpg,/pic/jianshenfuzhuang/E/detail_pic/3.jpg,/pic/jianshenfuzhuang/E/detail_pic/4.jpg,/pic/jianshenfuzhuang/E/detail_pic/5.jpg,/pic/jianshenfuzhuang/E/detail_pic/6.jpg');

insert into ego_family values(null,1,'准者紧身衣加绒保暖弹性压缩长袖上衣篮球跑步健身房运动健身衣','加绒保暖弹性紧身','1.5万+人付款','品牌:RIGORER/准者,功能:超强弹性,尺码:ML,颜色分类:灰色黑色,吊牌价:119.00,款号:Z119410604,上市时间:2019年秋季,袖长:长袖,衣长:及臀,服装版型:紧身,性别:男女,通用运动户外项目:瑜伽舞蹈器械健身,是否商场同款:是','/pic/jianshenfuzhuang/F/product_pic/1.jpg,/pic/jianshenfuzhuang/F/product_pic/2.jpg,/pic/jianshenfuzhuang/F/product_pic/3.jpg,/pic/jianshenfuzhuang/F/product_pic/4.jpg','/pic/jianshenfuzhuang/F/detail_pic/1.jpg,/pic/jianshenfuzhuang/F/detail_pic/2.jpg,/pic/jianshenfuzhuang/F/detail_pic/3.jpg,/pic/jianshenfuzhuang/F/detail_pic/4.jpg,/pic/jianshenfuzhuang/F/detail_pic/5.jpg');

insert into ego_family values(null,1,'儿童紧身衣训练服篮球足球运动套装女童跑步瑜伽健身服打底速干衣','速干透气不起球不掉色','131人付款','品牌:xnun,功能:吸湿排汗速干透气超强弹性,材质:涤纶,尺码:ML,颜色分类:黑色,吊牌价:129,款号:2001,上市时间:2018年秋季,袖长:长袖,衣长:及臀,服装版型:紧身,性别:儿童,通用运动户外项目:器械健身','/pic/jianshenfuzhuang/G/product_pic/1.jpg,/pic/jianshenfuzhuang/G/product_pic/2.jpg,/pic/jianshenfuzhuang/G/product_pic/3.jpg,/pic/jianshenfuzhuang/G/product_pic/4.jpg','/pic/jianshenfuzhuang/G/detail_pic/1.jpg,/pic/jianshenfuzhuang/G/detail_pic/2.jpg,/pic/jianshenfuzhuang/G/detail_pic/3.jpg,/pic/jianshenfuzhuang/G/detail_pic/4.jpg,/pic/jianshenfuzhuang/G/detail_pic/5.jpg,/pic/jianshenfuzhuang/G/detail_pic/6.jpg');

insert into ego_family values(null,1,'肌肉长袖T恤男兄弟紧身衣套头连帽衫健身卫衣运动跑步外套训练服','速干透气不起球不掉色','2.0万+人付款','品牌:other/其他,尺码:ML,颜色分类:黑色灰色,吊牌价:98,款号:02,袖长:长袖,衣长:及臀,服装版型:宽松,性别:男','/pic/jianshenfuzhuang/H/product_pic/1.jpg,/pic/jianshenfuzhuang/H/product_pic/2.jpg,/pic/jianshenfuzhuang/H/product_pic/3.jpg,/pic/jianshenfuzhuang/H/product_pic/4.jpg,/pic/jianshenfuzhuang/H/product_pic/5.jpg','/pic/jianshenfuzhuang/H/detail_pic/1.jpg,/pic/jianshenfuzhuang/H/detail_pic/2.jpg,/pic/jianshenfuzhuang/H/detail_pic/3.jpg,/pic/jianshenfuzhuang/H/detail_pic/4.jpg,/pic/jianshenfuzhuang/H/detail_pic/5.jpg,/pic/jianshenfuzhuang/H/detail_pic/6.jpg');

insert into ego_family values(null,2,'维动专业牛皮健身束腰护腰带深蹲硬拉男女运动负力量举重训练收腹','','492人付款','产品参数：,品牌:VEIDOORN/维动,尺码:M码（收腹后腰围60cm-80CM）L码（收腹后腰围80CM-95CM）,颜色分类:普通加压款黑色黑色牛皮加压10.5CM款护腰带,护具种类:护腰带,上市时间:2018年夏季,货号:举重护腰,运动户外项目:羽毛球乒乓球网球足球篮球台球棒球高尔夫壁球保龄球自行车轮滑瑜伽舞蹈橄榄球F1赛车排球器械健身武术冰上健身其他,是否商场同款:是','/pic/jianshenhuju/A/product_pic/1.jpg,/pic/jianshenhuju/A/product_pic/2.jpg,/pic/jianshenhuju/A/product_pic/3.jpg,/pic/jianshenhuju/A/product_pic/4.jpg,/pic/jianshenhuju/A/product_pic/5.jpg','/pic/jianshenhuju/A/detail_pic/1.jpg,/pic/jianshenhuju/A/detail_pic/2.jpg,/pic/jianshenhuju/A/detail_pic/3.jpg,/pic/jianshenhuju/A/detail_pic/4.jpg,/pic/jianshenhuju/A/detail_pic/5.jpg,/pic/jianshenhuju/A/detail_pic/6.jpg,/pic/jianshenhuju/A/detail_pic/7.jpg,/pic/jianshenhuju/A/detail_pic/8.jpg,/pic/jianshenhuju/A/detail_pic/9.jpg,/pic/jianshenhuju/A/detail_pic/10.jpg,/pic/jianshenhuju/A/detail_pic/11.jpg,/pic/jianshenhuju/A/detail_pic/12.jpg,/pic/jianshenhuju/A/detail_pic/13.jpg,/pic/jianshenhuju/A/detail_pic/14.jpg,/pic/jianshenhuju/A/detail_pic/15.jpg,/pic/jianshenhuju/A/detail_pic/16.jpg');

insert into ego_family values(null,2,'专业运动护膝盖关节男女健身篮球装备护套护漆跑步薄款半月板保暖','硅胶防滑.高弹透气贴合舒适','2.0万+人付款','产品参数：,品牌:VEIDOORN/维动,尺码:M：（膝盖围31-35cm）（适合体重70-115斤）L：（膝盖围36-40cm）（适合体重115-145斤）,颜色分类:黑色一只（4面针织,防滑）蓝色一只（4面针织,防滑）,护具种类:护膝,上市时间:2017年秋季,货号:718弹力护膝,运动户外项目:羽毛球乒乓球网球足球篮球台球棒球高尔夫壁球保龄球自行车轮滑瑜伽舞蹈橄榄球F1赛车排球器械健身武术冰上健身其他,是否商场同款:是','/pic/jianshenhuju/B/product_pic/1.jpg,/pic/jianshenhuju/B/product_pic/2.jpg,/pic/jianshenhuju/B/product_pic/3.jpg,/pic/jianshenhuju/B/product_pic/4.jpg,/pic/jianshenhuju/B/product_pic/5.jpg','/pic/jianshenhuju/B/detail_pic/1.jpg,/pic/jianshenhuju/B/detail_pic/2.jpg,/pic/jianshenhuju/B/detail_pic/3.jpg,/pic/jianshenhuju/B/detail_pic/4.jpg,/pic/jianshenhuju/B/detail_pic/5.jpg,/pic/jianshenhuju/B/detail_pic/6.jpg,/pic/jianshenhuju/B/detail_pic/7.jpg,/pic/jianshenhuju/B/detail_pic/8.jpg,/pic/jianshenhuju/B/detail_pic/9.jpg,/pic/jianshenhuju/B/detail_pic/10.jpg,/pic/jianshenhuju/B/detail_pic/11.jpg,/pic/jianshenhuju/B/detail_pic/12.jpg,/pic/jianshenhuju/B/detail_pic/13.jpg,/pic/jianshenhuju/B/detail_pic/14.jpg,/pic/jianshenhuju/B/detail_pic/15.jpg,/pic/jianshenhuju/B/detail_pic/16.jpg,/pic/jianshenhuju/B/detail_pic/17.jpg');

insert into ego_family values(null,2,'维动健身房护手套男女哑铃器械单杠锻炼护腕训练半指运动引体向上','硅胶防滑,腕带加压,舒适透气','1.5万+人付款','产品参数：,品牌:VEIDOORN/维动,尺码:L手围20-21cm适合手特大女士手中等或偏大男士XL手围22-23cm适合手特大男士,颜色分类:升级爪痕防护腕带款（黑色）升级爪痕防护腕带款（绿色）,护具种类:护手掌,上市时间:2017年秋季,货号:维动运动手套,运动户外项目:羽毛球乒乓球网球足球篮球台球棒球高尔夫壁球保龄球自行车轮滑橄榄球F1赛车排球器械健身武术冰上健身其他,是否商场同款:是','/pic/jianshenhuju/C/product_pic/1.jpg,/pic/jianshenhuju/C/product_pic/2.jpg,/pic/jianshenhuju/C/product_pic/3.jpg,/pic/jianshenhuju/C/product_pic/4.jpg,/pic/jianshenhuju/C/product_pic/5.jpg','/pic/jianshenhuju/C/detail_pic/1.jpg,/pic/jianshenhuju/C/detail_pic/2.jpg,/pic/jianshenhuju/C/detail_pic/3.jpg,/pic/jianshenhuju/C/detail_pic/4.jpg,/pic/jianshenhuju/C/detail_pic/5.jpg,/pic/jianshenhuju/C/detail_pic/6.jpg,/pic/jianshenhuju/C/detail_pic/7.jpg,/pic/jianshenhuju/C/detail_pic/8.jpg,/pic/jianshenhuju/C/detail_pic/9.jpg,/pic/jianshenhuju/C/detail_pic/10.jpg,/pic/jianshenhuju/C/detail_pic/11.jpg,/pic/jianshenhuju/C/detail_pic/12.jpg,/pic/jianshenhuju/C/detail_pic/13.jpg,/pic/jianshenhuju/C/detail_pic/14.jpg,/pic/jianshenhuju/C/detail_pic/15.jpg,/pic/jianshenhuju/C/detail_pic/16.jpg');

insert into ego_family values(null,2,'护踝男脚腕固定康复扭伤防崴脚运动踝关节保护套篮球女护脚踝护具','一片式设计穿脱方便加压透气','558人付款','产品参数：,品牌:tmt,尺码:L【适合40-42】XL【适合42-45】,颜色分类:H70加强防护款【全新升级】H70升级加强防护款,护具种类:护脚踝,上市时间:2019年夏季,货号:H66-2,运动户外项目:羽毛球乒乓球网球足球篮球台球棒球高尔夫壁球保龄球自行车轮滑瑜伽舞蹈橄榄球F1赛车排球器械健身武术冰上健身其他','/pic/jianshenhuju/D/product_pic/1.jpg,/pic/jianshenhuju/D/product_pic/2.jpg,/pic/jianshenhuju/D/product_pic/3.jpg,/pic/jianshenhuju/D/product_pic/4.jpg,/pic/jianshenhuju/D/product_pic/5.jpg','/pic/jianshenhuju/C/detail_pic/1.jpg,/pic/jianshenhuju/C/detail_pic/2.jpg,/pic/jianshenhuju/C/detail_pic/3.jpg,/pic/jianshenhuju/C/detail_pic/4.jpg,/pic/jianshenhuju/C/detail_pic/5.jpg,/pic/jianshenhuju/C/detail_pic/6.jpg,/pic/jianshenhuju/C/detail_pic/7.jpg');

insert into ego_family values(null,2,'运动护肘男女篮球网球健身手肘保护套关节护腕护臂保暖护手肘护具','日常运动佩戴缓解肘部压力','944人付款','产品参数：,品牌:tmt,尺码:左臂（单只装）右臂（单只装）,颜色分类:均码（可调节加压护肘）升级6代轻薄材质全透气网孔,护具种类:护手肘,上市时间:2017年春季,货号:B37,运动户外项目:羽毛球乒乓球网球足球篮球台球棒球高尔夫壁球保龄球自行车轮滑瑜伽舞蹈橄榄球F1赛车排球器械健身武术冰上健身其他,是否商场同款:否','/pic/jianshenhuju/E/product_pic/1.jpg,/pic/jianshenhuju/E/product_pic/2.jpg,/pic/jianshenhuju/E/product_pic/3.jpg,/pic/jianshenhuju/E/product_pic/4.jpg,/pic/jianshenhuju/E/product_pic/5.jpg','/pic/jianshenhuju/E/detail_pic/1.jpg,/pic/jianshenhuju/E/detail_pic/2.jpg,/pic/jianshenhuju/E/detail_pic/3.jpg,/pic/jianshenhuju/E/detail_pic/4.jpg,/pic/jianshenhuju/E/detail_pic/5.jpg,/pic/jianshenhuju/E/detail_pic/6.jpg,/pic/jianshenhuju/E/detail_pic/7.jpg');

insert into ego_family values(null,2,'运动护肩健身男女单肩网球羽毛球训练篮球护肩带防脱臼专业护具','专业加压夏季透气','286人付款','产品参数：,品牌:tmt,尺码:均码L(170斤以下选择)XL(170斤以上选择),颜色分类:J10基础款【左肩膀】J10基础款【右肩膀】,护具种类:护肩带,上市时间:2016年秋季,货号:B42,运动户外项目:羽毛球乒乓球网球足球篮球台球棒球高尔夫壁球保龄球自行车轮滑瑜伽舞蹈橄榄球F1赛车排球器械健身武术冰上健身','/pic/jianshenhuju/F/product_pic/1.jpg,/pic/jianshenhuju/F/product_pic/2.jpg,/pic/jianshenhuju/F/product_pic/3.jpg,/pic/jianshenhuju/F/product_pic/4.jpg,/pic/jianshenhuju/F/product_pic/5.jpg','/pic/jianshenhuju/F/detail_pic/1.jpg,/pic/jianshenhuju/F/detail_pic/2.jpg,/pic/jianshenhuju/F/detail_pic/3.jpg,/pic/jianshenhuju/F/detail_pic/4.jpg,/pic/jianshenhuju/F/detail_pic/5.jpg,/pic/jianshenhuju/F/detail_pic/6.jpg,/pic/jianshenhuju/F/detail_pic/7.jpg,/pic/jianshenhuju/F/detail_pic/8.jpg,/pic/jianshenhuju/F/detail_pic/9.jpg,/pic/jianshenhuju/F/detail_pic/10.jpg');

insert into ego_family values(null,2,'运动爆汗女发汗暴汗护腰带健身收腹束腰带瘦身减肥训练男塑腰燃脂','','996人付款','产品参数：,品牌:热血龙,尺码:S(宽19cm，长100cm/适合腰围1尺5-2尺1)M（宽20cm，长105cm/适合腰围1尺7-2尺6）,颜色分类:升级无痕款玫红色升级无痕款柠檬黄,护具种类:护腰带,上市时间:2019年夏季,货号:BHYD-0612','/pic/jianshenhuju/G/product_pic/1.jpg,/pic/jianshenhuju/G/product_pic/2.jpg,/pic/jianshenhuju/G/product_pic/3.jpg,/pic/jianshenhuju/G/product_pic/4.jpg,/pic/jianshenhuju/G/product_pic/5.jpg','/pic/jianshenhuju/G/detail_pic/1.jpg,/pic/jianshenhuju/G/detail_pic/2.jpg,/pic/jianshenhuju/G/detail_pic/3.jpg,/pic/jianshenhuju/G/detail_pic/4.jpg,/pic/jianshenhuju/G/detail_pic/5.jpg,/pic/jianshenhuju/G/detail_pic/6.jpg,/pic/jianshenhuju/G/detail_pic/7.jpg,/pic/jianshenhuju/G/detail_pic/8.jpg,/pic/jianshenhuju/G/detail_pic/9.jpg,/pic/jianshenhuju/G/detail_pic/10.jpg,/pic/jianshenhuju/G/detail_pic/11.jpg,/pic/jianshenhuju/G/detail_pic/12.jpg');

insert into ego_family values(null,2,'篮球护臂套男运动加长护腕护手臂袖套护肘关节体育用品护具保暖女','高弹舒适透气运动护臂护手肘','386人付款','产品参数：,品牌:Mdikawe/曼迪卡威,尺码:一只装【高弹力】两只装【高弹力】,颜色分类:桔色黑色,护具种类:护手肘,上市时间:2014年春季,货号:B3MD1,运动户外项目:羽毛球乒乓球网球足球篮球台球棒球高尔夫壁球保龄球自行车轮滑瑜伽舞蹈橄榄球F1赛车排球器械健身武术冰上健身其他','/pic/jianshenhuju/H/product_pic/1.jpg,/pic/jianshenhuju/H/product_pic/2.jpg,/pic/jianshenhuju/H/product_pic/3.jpg,/pic/jianshenhuju/H/product_pic/4.jpg,/pic/jianshenhuju/H/product_pic/5.jpg','/pic/jianshenhuju/H/detail_pic/1.jpg,/pic/jianshenhuju/H/detail_pic/2.jpg,/pic/jianshenhuju/H/detail_pic/3.jpg,/pic/jianshenhuju/H/detail_pic/4.jpg,/pic/jianshenhuju/H/detail_pic/5.jpg,/pic/jianshenhuju/H/detail_pic/6.jpg,/pic/jianshenhuju/H/detail_pic/7.jpg');

insert into ego_family values(null,3,'健身器材家用套装组合多功能力量训练运动器械健身家用综合训练器','50*75加粗管材，总重230kg，圭字型底座','261人付款','品牌:美力德,产地:中国,适用人数:3人,颜色分类:全新黑橙色全新黑橙色【包安装】全新黑黄色全新黑黄色【包安装】升级黑黄色升级黑黄色【包安装】全国联保送货上楼,上市时间:2017年,夏季货号:BL705A,是否商场同款:否','/pic/jianshenqicai/A/product_pic/1.jpg,/pic/jianshenqicai/A/product_pic/2.jpg,/pic/jianshenqicai/A/product_pic/3.jpg,/pic/jianshenqicai/A/product_pic/4.jpg,/pic/jianshenqicai/A/product_pic/5.jpg','');

insert into ego_family values(null,3,'多德士仰卧起坐健身器材家用固定脚辅助器运动多功能椅锻炼腹肌板','领券减20加长板179大扶手收藏加购送支架','5500+人付款','品牌:DDS/多德士,颜色分类:特价款【1.4米运动大扶手】（拉绳+助力器+俯卧杆）1.4米训练级【高配型】（拉绳+助力器+俯卧杆）送俯卧撑【1.4米运动大扶手】（拉绳+助力器+俯卧杆）1.4米运动版【经典透气型】（拉绳+助力器+俯卧撑杆）1.4米运动版【经典型】7棉款（拉绳+助力器+俯卧撑杆）家用级7泡棉【多功能】（拉绳+助力器+俯卧撑杆）家用级6泡棉【加强型】（拉绳+助力器）家用级6泡棉【标准型】（配拉绳）【豪华特价款】仰卧起坐卷腹燃脂【限量特惠】简约入门款辅助仰卧起坐卷腹瘦身收藏加购优先发货,按健身效果选择:腰腹练习,上市时间:2014年,春季货号:DDS-104,适用对象:男,健身器材分类:多功能仰卧板','/pic/jianshenqicai/B/product_pic/1.jpg,/pic/jianshenqicai/B/product_pic/2.jpg,/pic/jianshenqicai/B/product_pic/3.jpg,/pic/jianshenqicai/B/product_pic/4.jpg,/pic/jianshenqicai/B/product_pic/5.jpg','/pic/jianshenqicai/B/detail_pic/1.jpg,/pic/jianshenqicai/B/detail_pic/2.jpg,/pic/jianshenqicai/B/detail_pic/3.jpg,/pic/jianshenqicai/B/detail_pic/4.jpg,/pic/jianshenqicai/B/detail_pic/5.jpg');

insert into ego_family values(null,3,'麦瑞克椭圆机家用小型磁控踏步健身器材椭圆仪太空漫步机蜗牛T10','咨询领豪礼包安装调试测卡路里分期免息','1094人付款','品牌:MERACH/麦瑞克,产地:中国,颜色分类:清仓版-珍珠白-无座基础版-珍珠白-无座-智能APP基础版-魔法灰-无座-智能APP标准版-珍珠白-有座-智能APP标准版-魔法灰-有座-智能APP豪华版-珍珠白-无座-智能APP-测心率-显示屏豪华版-魔法灰-无座-智能APP-测心率-显示屏旗舰款-珍珠白-有座-智能APP-测心率-显示屏旗舰款-魔法灰-有座-智能APP-测心率-显示屏豪华版-珍珠白-无座-智能APP-测心率-显示屏-包安装（送减震垫）旗舰款-珍珠白-有座-智能APP-测心率-显示屏-包安装（送减震垫）,教材模式:其他,阻力调节方式:磁控式,上市时间:2019年春季,是否可折叠:不可折叠,货号:MR-532,驱动类型:后轮驱动,配送方式:送货到家并安装,是否商场同款:是,智能类型:其他智能,坡度调整方式:固定坡度,飞轮重量:5公斤,步幅:35cm以下','/pic/jianshenqicai/C/product_pic/1.jpg,/pic/jianshenqicai/C/product_pic/2.jpg,/pic/jianshenqicai/C/product_pic/3.jpg,/pic/jianshenqicai/C/product_pic/4.jpg,/pic/jianshenqicai/C/product_pic/5.jpg','/pic/jianshenqicai/C/detail_pic/1.jpg,/pic/jianshenqicai/C/detail_pic/2.jpg,/pic/jianshenqicai/C/detail_pic/3.jpg,/pic/jianshenqicai/C/detail_pic/4.jpg,/pic/jianshenqicai/C/detail_pic/5.jpg');

insert into ego_family values(null,3,'门上单杠家庭引体向上器家用单杆室内墙体免打孔体育用品健身器材','免打孔加固安全卡扣','2413人付款','品牌:小熊豆豆,颜色分类:防滑防弯曲】豪华款红黑60-100【透气加厚胶垫】送手套防滑防弯曲】豪华款红黑83-130【透气加厚胶垫】送手套防滑防弯曲】豪华款蓝黑60-100【透气加厚胶垫】送手套防滑防弯曲】豪华款蓝黑83-130【透气加厚胶垫】送手套加固安全豪华版】红黑60-100【九角防滑透气防汗】送手套加固安全豪华版】红黑83-130【九角防滑透气防汗】送手套加固安全豪华版】红黑100-150【九角防滑透气防汗】送手套齿扣双加固新款红黑60-100【九角防滑透气防汗】送手套齿扣双加固新款红黑70-110【九角防滑透气防汗】送手套齿扣双加固新款红黑83-130【九角防滑透气防汗】送手套齿扣双加固新款红黑90-140【九角防滑透气防汗】送手套齿扣双加固新款红黑100-150【九角防滑透气防汗】送手套齿扣双加固新款红黑100-160【九角防滑透气防汗】送手套齿扣双加固新款蓝黑60-100【九角防滑透气防汗】送手套齿扣双加固新款蓝黑83-130【九角防滑透气防汗】送手套齿扣双加固新款蓝黑100-150【九角防滑透气防汗】送手套【组合套餐】齿扣双加固黑红60-100cm+40KG臂力器【组合套餐】齿扣双加固黑红70-110cm+40KG臂力器【组合套餐】齿扣双加固黑红83-130cm+40KG臂力器【组合套餐】齿扣双加固黑红90-140cm+40KG臂力器【组合套餐】齿扣双加固黑红100-150cm+40KG臂力器【组合套餐】齿扣双加固黑红100-160cm+40KG臂力器,上市时间:2017年,夏季货号:5656','/pic/jianshenqicai/D/product_pic/1.jpg,/pic/jianshenqicai/D/product_pic/2.jpg,/pic/jianshenqicai/D/product_pic/3.jpg,/pic/jianshenqicai/D/product_pic/4.jpg,/pic/jianshenqicai/D/product_pic/5.jpg','/pic/jianshenqicai/D/detail_pic/1.jpg,/pic/jianshenqicai/D/detail_pic/2.jpg,/pic/jianshenqicai/D/detail_pic/3.jpg,/pic/jianshenqicai/D/detail_pic/4.jpg,/pic/jianshenqicai/D/detail_pic/5.jpg');

insert into ego_family values(null,3,'Reebok/锐步ZJET430跑步机家用款静音小型可折叠减震电动健身器材','空气减震节能马达430mm舒适跑台','100人付款','品牌:Reebok/锐步,系列:zjet430,售后服务:全国联保,颜色分类:红色【ZJET减震430mm跑宽+钻石纹跑台+蓝牙app】黑色【ZJET减震430mm跑宽+钻石纹跑台+蓝牙app】,上市时间:2016年春季,是否可折叠:是,货号:430,驱动类型:电子,健身器材分类:家用跑步机,心率测试:手握心率测试,配送方式:送货到家并安装,屏幕类型:液晶显示屏,是否商场同款:是,跑步机类型:单功能跑步机,跑带宽度:42-44CM,跑带区域:130x43cm,跑步机净重:75kg,跑步机最大承重:120kg,坡度调整方式:电动,持续输出马力:1.2hp,峰值马力:2hp,可持续输出马力:1hp(不含)－2（含）,速度调节范围:1-16Km/h','/pic/jianshenqicai/E/product_pic/1.jpg,/pic/jianshenqicai/E/product_pic/2.jpg,/pic/jianshenqicai/E/product_pic/3.jpg,/pic/jianshenqicai/E/product_pic/4.jpg,/pic/jianshenqicai/E/product_pic/5.jpg','/pic/jianshenqicai/E/detail_pic/1.jpg,/pic/jianshenqicai/E/detail_pic/2.jpg,/pic/jianshenqicai/E/detail_pic/3.jpg,/pic/jianshenqicai/E/detail_pic/4.jpg,/pic/jianshenqicai/E/detail_pic/5.jpg');

insert into ego_family values(null,3,'澳玛仕踏步机多功能脚踏家用减肥机瘦腿静音椭圆慢跑迷你健身器材','燃脂神器免安装静音小巧智能APP三期免息','350人付款','品牌:AOMAS/澳玛仕,颜色分类:珍珠白免安装下单送好礼夜鹰黑免安装下单送好礼T8Plus【白色扶手升级款】,按健身效果选择:整体减肥/塑身/美体,上市时间:2018年夏季,货号:OMS-T8,健身器材分类:多功能踏步机踏步机,配件类型:带拉绳其他,是否商场同款:否','/pic/jianshenqicai/F/product_pic/1.jpg,/pic/jianshenqicai/F/product_pic/2.jpg,/pic/jianshenqicai/F/product_pic/3.jpg,/pic/jianshenqicai/F/product_pic/4.jpg,/pic/jianshenqicai/F/product_pic/5.jpg','/pic/jianshenqicai/F/detail_pic/1.jpg,/pic/jianshenqicai/F/detail_pic/2.jpg,/pic/jianshenqicai/F/detail_pic/3.jpg,/pic/jianshenqicai/F/detail_pic/4.jpg,/pic/jianshenqicai/F/detail_pic/5.jpg');

insert into ego_family values(null,3,'亿健T900家用款小型静音正品折叠多功能室内电动跑步机健身房器材','七大仓库就近发货智能加油奔驰减震系统','199人付款','品牌:亿健,亿健跑步机型号:更多,售后服务:全国联保,产地:中国,颜色分类:10.1寸Wifi彩屏款多功能【送货上门包安装】高清触摸彩屏10.1寸Wifi彩屏款单功能【送货上门包安装】高清触摸彩屏旗舰版多功能奔驰六级减震系统/自助加油/58CM跑台/送货上楼旗舰版单功能奔驰六级减震系统/自助加油/58CM跑台/送货上楼,上市时间:2016年春季,是否可折叠:是,货号:T900,驱动类型:电子,健身器材分类:家用跑步机,心率测试:手握心率测试,配送方式:送货到家并安装,屏幕类型:高清屏,是否商场同款:否,跑步机类型:多功能跑步机,跑带宽度:42-44CM,跑带区域:126x42cm,跑步机最大承重:120kg,坡度调整方式:手动,持续输出马力:1hp,峰值马力:3hp,可持续输出马力:1hp及以下','/pic/jianshenqicai/G/product_pic/1.jpg,/pic/jianshenqicai/G/product_pic/2.jpg,/pic/jianshenqicai/G/product_pic/3.jpg,/pic/jianshenqicai/G/product_pic/4.jpg,/pic/jianshenqicai/G/product_pic/5.jpg','/pic/jianshenqicai/G/detail_pic/1.jpg,/pic/jianshenqicai/G/detail_pic/2.jpg,/pic/jianshenqicai/G/detail_pic/3.jpg,/pic/jianshenqicai/G/detail_pic/4.jpg,/pic/jianshenqicai/G/detail_pic/5.jpg');

insert into ego_family values(null,3,'李宁筋膜枪高频震动电动静音深层肌肉冲击器材健身放松小型按摩枪','李宁正品肌肉放松神器静音震动','474人付款','品牌:Lining/李宁,颜色分类:李宁筋膜枪【送5个按摩头】李宁筋膜枪【4个按摩头】,按健身效果选择:肌肉放松,上市时间:2019年冬季,适用对象:通用,智能类型:其他','/pic/jianshenqicai/H/product_pic/1.jpg,/pic/jianshenqicai/H/product_pic/2.jpg,/pic/jianshenqicai/H/product_pic/3.jpg,/pic/jianshenqicai/H/product_pic/4.jpg,/pic/jianshenqicai/H/product_pic/5.jpg','/pic/jianshenqicai/H/detail_pic/1.jpg,/pic/jianshenqicai/H/detail_pic/2.jpg,/pic/jianshenqicai/H/detail_pic/3.jpg,/pic/jianshenqicai/H/detail_pic/4.jpg,/pic/jianshenqicai/H/detail_pic/5.jpg');

insert into ego_family values(null,4,'健身黑麦全麦面包低粗粮卡代餐饱腹零食品早餐整箱营养养胃非脱脂健身食品','限前10000名29.6，卖完恢复原价39.6','4.5万+人付款','生产许可证编号：SC11234012105080,厂名：合肥市金鑫园食品有限公司,厂址：安徽省长丰双凤经济开发区凤麟路69号1幢厂房,厂家联系方式：025-83467169,保质期：90天,品牌:小鸡收腹,系列:黑麦代餐面包2,口味:限量促销【2斤整箱20包40片】（20天健身推荐）限量促销【4斤2箱40包80片】（40天健身推荐）,产地:中国大陆,省份:安徽省,包装方式:散装糕点,种类:西式糕点,净含量:1000g','/pic/jianshenshipin/A/product_pic/1.jpg,/pic/jianshenshipin/A/product_pic/2.jpg,/pic/jianshenshipin/A/product_pic/3.jpg','/pic/jianshenshipin/A/detail_pic/1.jpg,/pic/jianshenshipin/A/detail_pic/2.jpg,/pic/jianshenshipin/A/detail_pic/3.jpg,/pic/jianshenshipin/A/detail_pic/4.jpg,/pic/jianshenshipin/A/detail_pic/5.jpg,/pic/jianshenshipin/A/detail_pic/6.jpg,/pic/jianshenshipin/A/detail_pic/7.jpg,/pic/jianshenshipin/A/detail_pic/8.jpg');

insert into ego_family values(null,4,'【共20包】鲨鱼菲特速食鸡胸肉健身开袋即食代餐低脂轻食鸡肉食品健身食品','10袋鸡胸肉送6袋丸子再送4根鸡肉肠共1460g','4.5万+人付款','生产许可证编号：SC10437052300320,厂名：山东华协食品有限公司,厂址：中国山东省广饶县城北十公里,厂家联系方式：0543-7362961,保质期：180天,品牌:SHARKFIT/鲨鱼菲特,产地:中国大陆,省份:山东省,城市:东营市,重量(g):1260,包装方式:包装,套餐份量:1人份,套餐周期:1周','/pic/jianshenshipin/B/product_pic/1.jpg,/pic/jianshenshipin/B/product_pic/2.jpg,/pic/jianshenshipin/B/product_pic/3.jpg,/pic/jianshenshipin/B/product_pic/4.jpg,/pic/jianshenshipin/B/product_pic/5.jpg','/pic/jianshenshipin/B/detail_pic/1.jpg,/pic/jianshenshipin/B/detail_pic/2.jpg,/pic/jianshenshipin/B/detail_pic/3.jpg,/pic/jianshenshipin/B/detail_pic/4.jpg,/pic/jianshenshipin/B/detail_pic/5.jpg,/pic/jianshenshipin/B/detail_pic/6.jpg,/pic/jianshenshipin/B/detail_pic/7.jpg,/pic/jianshenshipin/B/detail_pic/8.jpg,/pic/jianshenshipin/B/detail_pic/9.jpg');

insert into ego_family values(null,4,'超级零代餐饱腹营养减燃卡天然食品脂控热肥健身断糖全家福礼盒健身食品','','247人付款','生产许可证编号：SC12433011007301,厂名：杭州衡美食品科技有限公司,厂址：浙江省杭州市余杭区良渚街道纬六路8号,厂家联系方式：4000027207,配料表：1套甜蜜版小粉盒三日餐、1套热辣版小粉盒三日餐、1套暖心版小粉盒三日餐、10瓶大餐救星,储藏方法：常温避光保存,保质期：210天,品牌:超级零,系列:组合套装,粉粉品类:粉粉组合装,产地:中国大陆,省份:浙江省,城市:杭州市,粉粉重量:其他/other,是否含糖:无糖,是否为有机食品:否,商品条形码:TU19120300001,包装方式:包装,套餐份量:1人,净含量:14000g','/pic/jianshenshipin/C/product_pic/1.jpg,/pic/jianshenshipin/C/product_pic/2.jpg,/pic/jianshenshipin/C/product_pic/3.jpg,/pic/jianshenshipin/C/product_pic/4.jpg,/pic/jianshenshipin/C/product_pic/5.jpg','/pic/jianshenshipin/C/detail_pic/1.jpg,/pic/jianshenshipin/C/detail_pic/2.jpg,/pic/jianshenshipin/C/detail_pic/3.jpg,/pic/jianshenshipin/C/detail_pic/4.jpg,/pic/jianshenshipin/C/detail_pic/5.jpg,/pic/jianshenshipin/C/detail_pic/6.jpg,/pic/jianshenshipin/C/detail_pic/7.jpg,/pic/jianshenshipin/C/detail_pic/8.jpg,/pic/jianshenshipin/C/detail_pic/9.jpg');

insert into ego_family values(null,4,'【30天计划】燕教授一个月套餐代餐饱腹食品粉营养健身脂断计划健身食品','','19人付款','生产许可证编号：SC12433011007301,厂名：杭州衡美食品科技有限公司,厂址：浙江省杭州市余杭区良渚街道纬六路8号,厂家联系方式：0757-86252048,保质期：480天,品牌:DRYAN/燕教授,系列:30天套餐,产地:中国大陆,省份:浙江省,城市:杭州市,包装方式:包装,净含量:240g','/pic/jianshenshipin/D/product_pic/1.jpg,/pic/jianshenshipin/D/product_pic/2.png,/pic/jianshenshipin/D/product_pic/3.png,/pic/jianshenshipin/D/product_pic/4.png,/pic/jianshenshipin/D/product_pic/5.png','/pic/jianshenshipin/D/detail_pic/1.png,/pic/jianshenshipin/D/detail_pic/2.png,/pic/jianshenshipin/D/detail_pic/3.png,/pic/jianshenshipin/D/detail_pic/4.png,/pic/jianshenshipin/D/detail_pic/5.png,/pic/jianshenshipin/D/detail_pic/6.png,/pic/jianshenshipin/D/detail_pic/7.png,/pic/jianshenshipin/D/detail_pic/8.png,/pic/jianshenshipin/D/detail_pic/9.png');

insert into ego_family values(null,4,'【共60包】鲨鱼菲特速食鸡胸肉健身即食代餐食品低脂轻食鸡肉减脂健身食品','','804人付款','生产许可证编号：SC10437160200650,厂名：山东隆鑫菲特食品有限公司,厂址：山东省滨州市滨城区滨北办事处凤凰一路8号、山东省滨州市滨城区滨北街道办事处凤凰一路8号,厂家联系方式：18954369955,保质期：180天,品牌:SHARKFIT/鲨鱼菲特,产地:中国大陆,省份:山东省,城市:东营市,重量(g):5000,包装方式:包装','/pic/jianshenshipin/E/product_pic/1.jpg,/pic/jianshenshipin/E/product_pic/2.png,/pic/jianshenshipin/E/product_pic/3.png,/pic/jianshenshipin/E/product_pic/4.png,/pic/jianshenshipin/E/product_pic/5.png','/pic/jianshenshipin/E/detail_pic/1.png,/pic/jianshenshipin/E/detail_pic/2.png,/pic/jianshenshipin/E/detail_pic/3.png,/pic/jianshenshipin/E/detail_pic/4.png,/pic/jianshenshipin/E/detail_pic/5.png,/pic/jianshenshipin/E/detail_pic/6.png,/pic/jianshenshipin/E/detail_pic/7.png,/pic/jianshenshipin/E/detail_pic/8.png,/pic/jianshenshipin/E/detail_pic/9.png,/pic/jianshenshipin/E/detail_pic/10.png');

insert into ego_family values(null,4,'【22袋】肌肉小王子速食鸡胸肉健身代餐即食轻食低脂零食鸡肉食品健身食品','买10袋肉送4袋丸+4袋肠+4袋蟹棒共22袋','1.5万+人付款','生产许可证编号：SC11137170100190,产品标准号：GB/T23586,厂名：山东范府食品有限公司,厂址：山东省菏泽市高新区万福办事处兰州路1113号,厂家联系方式：0530-5607766,配料表：鸡大胸、饮用水、食用盐、白砂糖、香辛料,储藏方法：放置阴凉处避免阳光直射,保质期：90天,品牌:MUSCLEPRINCE/肌肉小王子,产地:中国大陆,省份:山东省,城市:菏泽市,是否为有机食品:否,商品条形码:6952462417015,重量(g):1000,同城服务:同城24小时物流送货上门,包装方式:包装,套餐份量:1人份,套餐周期:1周,配送频次:1周2次,原产地:中国生鲜,储存温度:0-8℃','/pic/jianshenshipin/F/product_pic/1.jpg,/pic/jianshenshipin/F/product_pic/2.jpg,/pic/jianshenshipin/F/product_pic/3.jpg,/pic/jianshenshipin/F/product_pic/4.jpg,/pic/jianshenshipin/F/product_pic/5.jpg','/pic/jianshenshipin/F/detail_pic/1.jpg,/pic/jianshenshipin/F/detail_pic/2.jpg,/pic/jianshenshipin/F/detail_pic/3.jpg,/pic/jianshenshipin/F/detail_pic/4.jpg,/pic/jianshenshipin/F/detail_pic/5.jpg,/pic/jianshenshipin/F/detail_pic/6.jpg,/pic/jianshenshipin/F/detail_pic/7.jpg,/pic/jianshenshipin/F/detail_pic/8.jpg,/pic/jianshenshipin/F/detail_pic/9.jpg,/pic/jianshenshipin/F/detail_pic/10.jpg');

insert into ego_family values(null,4,'PerformixSST黑魔减脂胶囊60粒加强版蓝魔灰魔黄魔白魔健身食品','美国原装黑魔时尚健身补剂','131人付款','厂名：PERFORMIX,厂址：PERFORMIX,厂家联系方式：0551-64387920,保质期：730天,品牌:PERFORMIX,系列:x黑魔,产地:美国,适用性别:通用,保质期:24个月,生产企业:PERFORMIX,产品剂型:胶囊规格（粒/袋/ml/g）:60粒,计价单位:瓶,效期说明:24个月','/pic/jianshenshipin/G/product_pic/1.jpg,/pic/jianshenshipin/G/product_pic/2.jpg,/pic/jianshenshipin/G/product_pic/3.jpg,/pic/jianshenshipin/G/product_pic/4.jpg','/pic/jianshenshipin/G/detail_pic/1.jpg,/pic/jianshenshipin/G/detail_pic/2.jpg,/pic/jianshenshipin/G/detail_pic/3.jpg,/pic/jianshenshipin/G/detail_pic/4.jpg,/pic/jianshenshipin/G/detail_pic/5.jpg,/pic/jianshenshipin/G/detail_pic/6.jpg,/pic/jianshenshipin/G/detail_pic/7.jpg,/pic/jianshenshipin/G/detail_pic/8.jpg,/pic/jianshenshipin/G/detail_pic/9.jpg,/pic/jianshenshipin/G/detail_pic/10.jpg');

insert into ego_family values(null,4,'Freedom进口原味全麦纯燕麦片即食无糖脱脂健身早餐代餐养胃食品健身食品','澳洲营养膳食保税仓发货无蔗糖纯燕软糯清香','2.0万+人付款','厂名：freedomfood,厂址：澳大利亚,厂家联系方式：1800646231,保质期：420天,包装方式:包装,是否含糖:无糖,产地:澳大利亚,饮品种类:纯麦片,原料成分:燕麦,是否即食:是,套餐份量:2人,套餐周期:2周,配送频次:1周1次,品牌:FreedomFoods,系列:无糖纯燕1KG,商品条形码:9315090203431,口味:高纤原味燕麦,净含量:1000g','/pic/jianshenshipin/H/product_pic/1.jpg,/pic/jianshenshipin/H/product_pic/2.jpg,/pic/jianshenshipin/H/product_pic/3.jpg,/pic/jianshenshipin/H/product_pic/4.jpg,/pic/jianshenshipin/H/product_pic/5.jpg','/pic/jianshenshipin/H/detail_pic/1.jpg,/pic/jianshenshipin/H/detail_pic/2.jpg,/pic/jianshenshipin/H/detail_pic/3.jpg,/pic/jianshenshipin/H/detail_pic/4.jpg,/pic/jianshenshipin/H/detail_pic/5.jpg,/pic/jianshenshipin/H/detail_pic/6.jpg,/pic/jianshenshipin/H/detail_pic/7.jpg,/pic/jianshenshipin/H/detail_pic/8.jpg,/pic/jianshenshipin/H/detail_pic/9.jpg');

insert into ego_family values(null,5,'安踏运动鞋男鞋气垫鞋官网2019冬季新款皮面休闲鞋男士鞋子跑步鞋','全场满398减110元','1474人付款','产品参数：,产品名称：ANTA/安踏11537776,品牌:ANTA/安踏,功能:减震防滑耐磨防水包裹性支撑平衡抗冲击轻便增高保暖,闭合方式:系带,鞋码:394040.5414242.54344.5,颜色分类:【A款】-深藏青/荧光绿/火花红【热卖推荐】【A款】-黑/安踏白【热卖推荐】【A款】-安踏白/淡灰【A款】-中灰/火花红【B款】-黑/燕麦灰-5【加绒皮面】【B款】-全黑/燕麦灰【皮网结合】【B款】-黑/安踏白【皮网结合】【B款】-深灰/雾灰【皮网结合】【C款】-黑/荧光柿子红-7【秋冬皮面】【C款】-大学红/象牙白/黑-8【秋冬皮面】【C款】-一度灰/姜黄【皮网结合】【C款】-黑/柿子红【皮网结合】【C款】-象牙白/正蓝【皮网结合】,运动鞋科技:气垫,适用场地:室外硬地室内地板,吊牌价:369,款号:11537776,是否瑕疵:否,上市时间:2018年夏季,鞋底材质:橡胶+EVA,性别:男子,运动系列:跑步训练,帮面材质:人造革+织物,是否商场同款:是','/pic/yundongxie/A/product_pic/1.jpg,/pic/yundongxie/A/product_pic/2.jpg,/pic/yundongxie/A/product_pic/3.jpg,/pic/yundongxie/A/product_pic/4.jpg,/pic/yundongxie/A/product_pic/5.jpg','/pic/yundongxie/A/detail_pic/1.jpg,/pic/yundongxie/A/detail_pic/2.jpg,/pic/yundongxie/A/detail_pic/3.jpg,/pic/yundongxie/A/detail_pic/4.jpg,/pic/yundongxie/A/detail_pic/5.jpg,/pic/yundongxie/A/detail_pic/6.jpg,/pic/yundongxie/A/detail_pic/7.jpg,/pic/yundongxie/A/detail_pic/8.jpg,/pic/yundongxie/A/detail_pic/9.jpg');

insert into ego_family values(null,5,'安踏运动鞋男秋季2019新款男士气垫鞋休闲综训官网冬季皮面鞋子男','安踏正品气垫后跟减震缓震','897人付款','产品参数：,品牌:ANTA/安踏,功能:减震防滑耐磨包裹性保暖,闭合方式:系带,鞋码:394040.5414242.54344.5,颜色分类:黑/燕麦灰-1二度灰/金属金/象牙白黑/大学红/象牙白-5黑/安踏白-3象牙白/正蓝-1大学红/象牙白-4一度灰/姜黄-6,运动鞋科技:气垫,适用场地:室外硬地室内地板,吊牌价:369.00,款号:11847775,是否瑕疵:否,上市时间:2018年冬季,鞋底材质:EVA,性别:男子,运动系列:休闲生活系列鞋,帮面材质:人造革+织物,是否商场同款:是','/pic/yundongxie/B/product_pic/1.jpg,/pic/yundongxie/B/product_pic/2.jpg,/pic/yundongxie/B/product_pic/3.jpg,/pic/yundongxie/B/product_pic/4.jpg,/pic/yundongxie/B/product_pic/5.jpg','/pic/yundongxie/B/detail_pic/1.jpg,/pic/yundongxie/B/detail_pic/2.jpg,/pic/yundongxie/B/detail_pic/3.jpg,/pic/yundongxie/B/detail_pic/4.jpg,/pic/yundongxie/B/detail_pic/5.jpg,/pic/yundongxie/B/detail_pic/6.jpg,/pic/yundongxie/B/detail_pic/7.jpg,/pic/yundongxie/B/detail_pic/8.jpg,/pic/yundongxie/B/detail_pic/9.jpg');

insert into ego_family values(null,5,'UnderArmour安德玛UA男子HOVRApex运动鞋训练鞋-3022206','轻盈脚感防护出众稳定灵活支撑良好','20人付款','产品参数：,品牌:UnderArmour/安德玛,功能:减震耐磨,闭合方式:系带,鞋码:4040.5414242.5434444.54545.5464747.548.5,颜色分类:100灰色002黑色101灰色,适用场地:室外硬地室内地板,吊牌价:1199,款号:3022206,是否瑕疵:否,上市时间:2018年秋季,性别:男子,是否商场同款:是','/pic/yundongxie/C/product_pic/1.jpg,/pic/yundongxie/C/product_pic/2.jpg,/pic/yundongxie/C/product_pic/3.jpg,/pic/yundongxie/C/product_pic/4.jpg,/pic/yundongxie/C/product_pic/5.jpg','/pic/yundongxie/C/detail_pic/1.jpg,/pic/yundongxie/C/detail_pic/2.jpg,/pic/yundongxie/C/detail_pic/3.jpg,/pic/yundongxie/C/detail_pic/4.jpg,/pic/yundongxie/C/detail_pic/5.jpg,/pic/yundongxie/C/detail_pic/6.jpg,/pic/yundongxie/C/detail_pic/7.jpg,/pic/yundongxie/C/detail_pic/8.jpg,/pic/yundongxie/C/detail_pic/9.jpg');

insert into ego_family values(null,5,'FILA斐乐官方男子训练鞋2019冬季新款专业运动鞋室内健身鞋男','百年意式经典品牌官方旗舰店正品保障','140人付款','产品参数：,品牌:Fila/斐乐,功能:耐磨,闭合方式:系带,鞋码:394040.5414242.54344.5,颜色分类:黑色-BK集团白-WT藕荷色/集团白-WV,适用场地:室外硬地室内地板,吊牌价:780,款号:F12M942406F,是否瑕疵:否,上市时间:2019年冬季,鞋底材质:防滑橡胶,性别:男子,运动系列:综训系列,帮面材质:TPU+人造革+织物,是否商场同款:是','/pic/yundongxie/D/product_pic/1.jpg,/pic/yundongxie/D/product_pic/2.jpg,/pic/yundongxie/D/product_pic/3.jpg,/pic/yundongxie/D/product_pic/4.jpg,/pic/yundongxie/D/product_pic/5.jpg','/pic/yundongxie/D/detail_pic/1.jpg,/pic/yundongxie/D/detail_pic/2.jpg,/pic/yundongxie/D/detail_pic/3.jpg,/pic/yundongxie/D/detail_pic/4.jpg,/pic/yundongxie/D/detail_pic/5.jpg,/pic/yundongxie/D/detail_pic/6.jpg,/pic/yundongxie/D/detail_pic/7.jpg,/pic/yundongxie/D/detail_pic/8.jpg,/pic/yundongxie/D/detail_pic/9.jpg');

insert into ego_family values(null,5,'Reebok锐步运动健身LEGACYLIFTER男子低帮训练鞋FZM24','男子低帮训练鞋','12人付款','产品参数：,品牌:Reebok/锐步,鞋码:394040.5414242.5434444.54545.54647,颜色分类:DV6225-白色/蓝色,吊牌价:1299,款号:FZM24-19Q4,上市时间:2019年冬季,性别:男子,是否商场同款:是','/pic/yundongxie/E/product_pic/1.jpg,/pic/yundongxie/E/product_pic/2.jpg,/pic/yundongxie/E/product_pic/3.jpg,/pic/yundongxie/E/product_pic/4.jpg,/pic/yundongxie/E/product_pic/5.jpg','/pic/yundongxie/E/detail_pic/1.jpg,/pic/yundongxie/E/detail_pic/2.jpg,/pic/yundongxie/E/detail_pic/3.jpg,/pic/yundongxie/E/detail_pic/4.jpg,/pic/yundongxie/E/detail_pic/5.jpg,/pic/yundongxie/E/detail_pic/6.jpg,/pic/yundongxie/E/detail_pic/7.jpg,/pic/yundongxie/E/detail_pic/8.jpg,/pic/yundongxie/E/detail_pic/9.jpg');

insert into ego_family values(null,5,'Reebok锐步官方NANO9男子网面运动低帮健身训练低帮鞋EGQ72','男子低帮训练鞋','26人付款','产品参数：,品牌:Reebok/锐步,鞋码:34.5353636.537.538.5394040.5414242.5434444.54545.54647,颜色分类:FU6828-黑色/橘色DV6359-中麻灰,吊牌价:899,款号:EGQ72-19Q3-4,上市时间:2019年冬季,性别:男子,是否商场同款:是','/pic/yundongxie/F/product_pic/1.jpg,/pic/yundongxie/F/product_pic/2.jpg,/pic/yundongxie/F/product_pic/3.jpg,/pic/yundongxie/F/product_pic/4.jpg,/pic/yundongxie/F/product_pic/5.jpg','/pic/yundongxie/F/detail_pic/1.jpg,/pic/yundongxie/F/detail_pic/2.jpg,/pic/yundongxie/F/detail_pic/3.jpg,/pic/yundongxie/F/detail_pic/4.jpg,/pic/yundongxie/F/detail_pic/5.jpg,/pic/yundongxie/F/detail_pic/6.jpg,/pic/yundongxie/F/detail_pic/7.jpg,/pic/yundongxie/F/detail_pic/8.jpg,/pic/yundongxie/F/detail_pic/9.jpg');

insert into ego_family values(null,5,'FILA斐乐官方男子训练鞋2019冬季新款专业运动鞋透气轻便综训鞋','百年意式经典品牌官方旗舰店正品保障','85人付款','产品参数：,品牌:Fila/斐乐,闭合方式:系带,鞋码:394040.5414242.54344.5,颜色分类:黑色-BK集团白-WT,适用场地:室外硬地室内地板,吊牌价:780,款号:F12M942401F,是否瑕疵:否,上市时间:2019年冬季,鞋底材质:粘胶,性别:男子,运动系列:综训系列,帮面材质:织物/PP膜,是否商场同款:是','/pic/yundongxie/G/product_pic/1.jpg,/pic/yundongxie/G/product_pic/2.jpg,/pic/yundongxie/G/product_pic/3.jpg,/pic/yundongxie/G/product_pic/4.jpg,/pic/yundongxie/G/product_pic/5.jpg','/pic/yundongxie/G/detail_pic/1.jpg,/pic/yundongxie/G/detail_pic/2.jpg,/pic/yundongxie/G/detail_pic/3.jpg,/pic/yundongxie/G/detail_pic/4.jpg,/pic/yundongxie/G/detail_pic/5.jpg,/pic/yundongxie/G/detail_pic/6.jpg,/pic/yundongxie/G/detail_pic/7.jpg,/pic/yundongxie/G/detail_pic/8.jpg,/pic/yundongxie/G/detail_pic/9.jpg');

insert into ego_family values(null,5,'安踏运动鞋男鞋2019新款秋冬季皮面防水休闲气垫鞋官网品牌跑步鞋','anta安踏官网正品气垫减震运动鞋','514人付款','产品参数：,产品名称：ANTA/安踏11637778,品牌:ANTA/安踏,功能:减震防滑耐磨防水包裹性增高保暖,闭合方式:系带,鞋码:394040.5414242.54344.5,颜色分类:白色黑/夏威夷蓝/雾灰黑/中灰/安踏白安踏白/淡灰黑/燕麦灰（加绒）黑/燕麦灰黑黑色/白色/灰色冷灰/安踏白中灰/深藏青/荧光绿/火花红,运动鞋科技:气垫,适用场地:室外硬地室内地板,吊牌价:369,款号:11637778,是否瑕疵:否,上市时间:2019年冬季,鞋底材质:橡胶+EVA,性别:男子,运动系列:训练AIRMAX,帮面材质:人造革+织物,是否商场同款:是','/pic/yundongxie/H/product_pic/1.jpg,/pic/yundongxie/H/product_pic/2.jpg,/pic/yundongxie/H/product_pic/3.jpg,/pic/yundongxie/H/product_pic/4.jpg,/pic/yundongxie/H/product_pic/5.jpg','/pic/yundongxie/H/detail_pic/1.jpg,/pic/yundongxie/H/detail_pic/2.jpg,/pic/yundongxie/H/detail_pic/3.jpg,/pic/yundongxie/H/detail_pic/4.jpg,/pic/yundongxie/H/detail_pic/5.jpg,/pic/yundongxie/H/detail_pic/6.jpg,/pic/yundongxie/H/detail_pic/7.jpg,/pic/yundongxie/H/detail_pic/8.jpg,/pic/yundongxie/H/detail_pic/9.jpg');

insert into ego_product values(null,1,29.90,'尺码:S,颜色:红色','210件');
insert into ego_product values(null,1,29.90,'尺码:S,颜色:紫色','210件');
insert into ego_product values(null,1,29.90,'尺码:S,颜色:黑色','210件');
insert into ego_product values(null,1,29.90,'尺码:S,颜色:粉色','210件');
insert into ego_product values(null,1,29.90,'尺码:S,颜色:褐色','210件');
insert into ego_product values(null,1,29.90,'尺码:L,颜色:红色','210件');
insert into ego_product values(null,1,29.90,'尺码:L,颜色:紫色','210件');
insert into ego_product values(null,1,29.90,'尺码:L,颜色:黑色','210件');
insert into ego_product values(null,1,29.90,'尺码:L,颜色:粉色','210件');
insert into ego_product values(null,1,29.90,'尺码:L,颜色:褐色','210件');

insert into ego_product values(null,2,429.00,'尺码:S,颜色:紫色','210件');
insert into ego_product values(null,2,429.00,'尺码:S,颜色:黑色','210件');
insert into ego_product values(null,2,429.00,'尺码:S,颜色:白色','210件');
insert into ego_product values(null,2,429.00,'尺码:S,颜色:青色','210件');
insert into ego_product values(null,2,429.00,'尺码:M,颜色:紫色','210件');
insert into ego_product values(null,2,429.00,'尺码:M,颜色:黑色','210件');
insert into ego_product values(null,2,429.00,'尺码:M,颜色:白色','210件');
insert into ego_product values(null,2,429.00,'尺码:M,颜色:青色','210件');

insert into ego_product values(null,3,449.00,'尺码:32A,颜色:黑色','210件');
insert into ego_product values(null,3,449.00,'尺码:34D,颜色:黑色','210件');
insert into ego_product values(null,3,449.00,'尺码:38A,颜色:黑色','210件');
insert into ego_product values(null,3,449.00,'尺码:38D,颜色:黑色','210件');

insert into ego_product values(null,4,79.00,'尺码:M,颜色:黑色','210件');
insert into ego_product values(null,4,79.00,'尺码:L,颜色:黑色','210件');

insert into ego_product values(null,5,329.90,'尺码:M,颜色:黑色','449件');
insert into ego_product values(null,5,329.90,'尺码:M,颜色:蓝色','449件');
insert into ego_product values(null,5,329.90,'尺码:M,颜色:粉色','449件');
insert into ego_product values(null,5,329.90,'尺码:L,颜色:黑色','449件');
insert into ego_product values(null,5,329.90,'尺码:L,颜色:蓝色','449件');
insert into ego_product values(null,5,329.90,'尺码:L,颜色:粉色','449件');

insert into ego_product values(null,6,69.00,'尺码:M,颜色:黑色','65064件');
insert into ego_product values(null,6,69.00,'尺码:L,颜色:黑色','65064件');
insert into ego_product values(null,6,69.00,'尺码:M,颜色:灰色','65064件');
insert into ego_product values(null,6,69.00,'尺码:L,颜色:灰色','65064件');

insert into ego_product values(null,7,80,'尺码:M,颜色:黑色','1072件');
insert into ego_product values(null,7,80,'尺码:L,颜色:黑色','1072件');

insert into ego_product values(null,8,28.00,'尺码:M,颜色:黑色','24248件');
insert into ego_product values(null,8,28.00,'尺码:M,颜色:灰色','24248件');
insert into ego_product values(null,8,28.00,'尺码:L,颜色:黑色','24248件');
insert into ego_product values(null,8,28.00,'尺码:L,颜色:灰色','24248件');

insert into ego_product values(null,9,58.00,'尺码:M码（收腹后腰围60cm-80cm）,颜色分类:普通加压款黑色','11514件');
insert into ego_product values(null,9,68.00,'尺码:M码（收腹后腰围60cm-80cm）,颜色分类:黑色牛皮加压10.5CM款','9663件');
insert into ego_product values(null,9,58.00,'尺码:L码（收腹后腰围80CM-95CM）,颜色分类:普通加压款黑色','11576件');
insert into ego_product values(null,9,68.00,'尺码:L码（收腹后腰围80CM-95CM）,颜色分类:黑色牛皮加压10.5CM款','9559件');

insert into ego_product values(null,10,20.10,'尺码:M：（膝盖围31-35cm）（适合体重70-115斤）,颜色分类:黑色一只（4面针织，防滑）','9286件');
insert into ego_product values(null,10,20.10,'尺码:M：（膝盖围31-35cm）（适合体重70-115斤）,颜色分类:蓝色一只（4面针织，防滑）','9878件');
insert into ego_product values(null,10,20.10,'尺码:L：（膝盖围36-40cm）（适合体重115-145斤）,颜色分类:黑色一只（4面针织，防滑）','8644件');
insert into ego_product values(null,10,20.10,'尺码:L：（膝盖围36-40cm）（适合体重115-145斤）,颜色分类:蓝色一只（4面针织，防滑）','9668件');

insert into ego_product values(null,11,46.80,'尺码:L手围20-21cm,适合手特大女士，手中等或偏大男士,颜色分类:升级爪痕防护腕带款（黑色）','7230件');
insert into ego_product values(null,11,46.80,'尺码:L手围20-21cm,适合手特大女士，手中等或偏大男士,颜色分类:升级爪痕防护腕带款（绿色）','9263件');
insert into ego_product values(null,11,46.80,'尺码:XL手围22-23cm,适合手特大男士,颜色分类:升级爪痕防护腕带款（黑色）','9266件');
insert into ego_product values(null,11,46.80,'尺码:XL手围22-23cm,适合手特大男士,颜色分类:升级爪痕防护腕带款（绿色）','9826件');

insert into ego_product values(null,12,69.00,'尺码:L【适合40-42】,颜色分类:H70加强防护款','155件');
insert into ego_product values(null,12,69.00,'尺码:XL【适合42-45】,颜色分类:H70加强防护款','186件');
insert into ego_product values(null,12,72.80,'尺码:L【适合40-42】,颜色分类:【全新升级】H70升级加强防护款','201件');
insert into ego_product values(null,12,72.80,'尺码:XL【适合42-45】,颜色分类:【全新升级】H70升级加强防护款','241件');

insert into ego_product values(null,13,28.00,'尺码:左臂（单只装）,颜色分类:均码（可调节加压护肘）','607件');
insert into ego_product values(null,13,28.00,'尺码:右臂（单只装）,颜色分类:均码（可调节加压护肘）','535件');
insert into ego_product values(null,13,32.50,'尺码:左臂（单只装）,颜色分类:升级6代轻薄材质全透气网孔','515件');
insert into ego_product values(null,13,32.50,'尺码:右臂（单只装）,颜色分类:升级6代轻薄材质全透气网孔','573件');

insert into ego_product values(null,14,45.00,'尺码:L(170斤以下选择),颜色分类:J10基础款【左肩膀】','170件');
insert into ego_product values(null,14,45.00,'尺码:L(170斤以下选择),颜色分类:J10基础款【右肩膀】','77件');
insert into ego_product values(null,14,45.00,'尺码:XL(170斤以上选择),颜色分类:J10基础款【左肩膀】','74件');
insert into ego_product values(null,14,45.00,'尺码:XL(170斤以上选择),颜色分类:J10基础款【右肩膀】','99件');

insert into ego_product values(null,15,79.00,'尺码:S(宽19cm，长100cm/适合腰围1尺5-2尺1),颜色分类:升级无痕款玫红色','43件');
insert into ego_product values(null,15,79.00,'尺码:S(宽19cm，长100cm/适合腰围1尺5-2尺1),颜色分类:升级无痕款柠檬黄','44件');
insert into ego_product values(null,15,79.00,'尺码:M（宽20cm，长105cm/适合腰围1尺7-2尺6）,颜色分类:升级无痕款玫红色','11件');
insert into ego_product values(null,15,79.00,'尺码:M（宽20cm，长105cm/适合腰围1尺7-2尺6）,颜色分类:升级无痕款柠檬黄','36件');

insert into ego_product values(null,16,15.00,'尺码:一只装【高弹力】,颜色分类:桔色','330件');
insert into ego_product values(null,16,15.00,'尺码:一只装【高弹力】,颜色分类:黑色','253件');
insert into ego_product values(null,16,15.00,'尺码:两只装【高弹力】,颜色分类:桔色','285件');
insert into ego_product values(null,16,15.00,'尺码:两只装【高弹力】,颜色分类:黑色','120件');

insert into ego_product values(null,17,3599.00,'颜色分类:全新黑橙色','202件');
insert into ego_product values(null,17,3899.00,'颜色分类:全新黑橙色【包安装】','205件');
insert into ego_product values(null,17,3599.00,'颜色分类:全新黑黄色','207件');
insert into ego_product values(null,17,3599.00,'颜色分类:升级黑黄色','199件');

insert into ego_product values(null,18,129.90,'颜色分类:特价款【1.4米运动大扶手】（拉绳+助力器+俯卧杆）','1427件');
insert into ego_product values(null,18,179.90,'颜色分类:1.4米训练级（拉绳+助力器+俯卧杆）送俯卧撑','1817件');
insert into ego_product values(null,18,169.90,'颜色分类:【1.4米运动大扶手】（拉绳+助力器+俯卧杆）','1436件');
insert into ego_product values(null,18,159.90,'颜色分类:1.4米运动版【经典透气型】（拉绳+助力器+俯卧杆）','1532件');

insert into ego_product values(null,19,799.00,'颜色分类:清仓版-珍珠白-无座','4973件');
insert into ego_product values(null,19,849.00,'颜色分类:基础版-魔法灰-无座-智能APP','9239件');
insert into ego_product values(null,19,1149.00,'颜色分类:豪华版-魔法灰-无座-智能APP-测心率-显示屏','9900件');
insert into ego_product values(null,19,1249.00,'颜色分类:旗舰版-珍珠白-有座-智能APP-测心率-显示屏','9909件');

insert into ego_product values(null,20,17.00,'颜色分类:防滑防弯曲】豪华款红黑60-100【透气加厚胶垫】','1962件');
insert into ego_product values(null,20,33.00,'颜色分类:加固安全豪华款】红黑60-100【九角防滑透气防汗】','3150件');
insert into ego_product values(null,20,82.00,'颜色分类:【组合套餐】齿扣双加固黑红83-130cm+40kg臂力器','466件');
insert into ego_product values(null,20,48.00,'颜色分类:齿扣双加固新款【蓝黑83-130【九角防滑透气防汗】','8998件');

insert into ego_product values(null,21,4999.00,'颜色分类:红色【ZJET减震430mm跑宽+钻石纹跑台+蓝牙app','545件');
insert into ego_product values(null,21,4999.00,'颜色分类:黑色【ZJET减震430mm跑宽+钻石纹跑台+蓝牙app','624件');

insert into ego_product values(null,22,1580.00,'颜色分类:珍珠白免安装','136件');
insert into ego_product values(null,22,1580.00,'颜色分类:夜鹰黑免安装','1件');
insert into ego_product values(null,22,1680.00,'颜色分类:T8Plus【白色扶手升级款】','49件');

insert into ego_product values(null,23,2349.00,'颜色分类:10.1寸WiFi显示屏多功能','545件');
insert into ego_product values(null,23,2149.00,'颜色分类:10.1寸WiFi显示屏单功能','2701件');
insert into ego_product values(null,23,1599.00,'颜色分类:旗舰版单功能奔驰六级减震系统','827件');

insert into ego_product values(null,24,869.00,'颜色分类:李宁筋膜枪【送5个按摩头】','371件');
insert into ego_product values(null,24,1799.00,'颜色分类:李宁筋膜枪4个按摩头','312件');

insert into ego_product values(null,25,29.60,'口味:限量促销【2斤整箱20包40片】（20天健身推荐）','3646件');
insert into ego_product values(null,25,53.20,'口味:限量促销【4斤2箱40包80片】（40天健身推荐）','6555件');

insert into ego_product values(null,26,69.90,'','47643件');

insert into ego_product values(null,27,1386.00,'','2416件');

insert into ego_product values(null,28,2075.00,'','87件');

insert into ego_product values(null,29,329.90,'','449件');

insert into ego_product values(null,30,69.90,'','65064件');

insert into ego_product values(null,31,489.00,'口味:黑魔60粒（咨询客服赠品升级熊猫cla60粒/需加购拍下）','1072件');

insert into ego_product values(null,32,45.00,'口味:高纤原味燕麦','24248件');

insert into ego_product values(null,33,239.00,'尺码:39,颜色分类:【A款】-深藏青/荧光绿/火花红【热卖推荐】','17件');
insert into ego_product values(null,33,239.00,'尺码:39,颜色分类:【A款】-黑/安踏白【热卖推荐】','119件');
insert into ego_product values(null,33,239.00,'尺码:39,颜色分类:【A款】-安踏白/淡灰','15件');
insert into ego_product values(null,33,239.00,'尺码:40,颜色分类:【A款】-深藏青/荧光绿/火花红【热卖推荐】','44件');
insert into ego_product values(null,33,239.00,'尺码:40,颜色分类:【A款】-黑/安踏白【热卖推荐】','169件');
insert into ego_product values(null,33,239.00,'尺码:40,颜色分类:【A款】-安踏白/淡灰','21件');
insert into ego_product values(null,33,239.00,'尺码:40.5,颜色分类:【A款】-深藏青/荧光绿/火花红【热卖推荐】','87件');
insert into ego_product values(null,33,239.00,'尺码:40.5,颜色分类:【A款】-黑/安踏白【热卖推荐】','108件');
insert into ego_product values(null,33,239.00,'尺码:40.5,颜色分类:【A款】-安踏白/淡灰','10件');
insert into ego_product values(null,33,239.00,'尺码:41,颜色分类:【A款】-深藏青/荧光绿/火花红【热卖推荐】','134件');
insert into ego_product values(null,33,239.00,'尺码:41,颜色分类:【A款】-黑/安踏白【热卖推荐】','225件');
insert into ego_product values(null,33,239.00,'尺码:41,颜色分类:【A款】-安踏白/淡灰','0件');
insert into ego_product values(null,33,239.00,'尺码:42,颜色分类:【A款】-深藏青/荧光绿/火花红【热卖推荐】','133件');
insert into ego_product values(null,33,239.00,'尺码:42,颜色分类:【A款】-黑/安踏白【热卖推荐】','233件');
insert into ego_product values(null,33,239.00,'尺码:42,颜色分类:【A款】-安踏白/淡灰','6件');
insert into ego_product values(null,33,239.00,'尺码:42.5,颜色分类:【A款】-深藏青/荧光绿/火花红【热卖推荐】','29件');
insert into ego_product values(null,33,239.00,'尺码:42.5,颜色分类:【A款】-黑/安踏白【热卖推荐】','38件');
insert into ego_product values(null,33,239.00,'尺码:42.5,颜色分类:【A款】-安踏白/淡灰','3件');
insert into ego_product values(null,33,239.00,'尺码:43,颜色分类:【A款】-深藏青/荧光绿/火花红【热卖推荐】','94件');
insert into ego_product values(null,33,239.00,'尺码:43,颜色分类:【A款】-黑/安踏白【热卖推荐】','104件');
insert into ego_product values(null,33,239.00,'尺码:43,颜色分类:【A款】-安踏白/淡灰','12件');
insert into ego_product values(null,33,239.00,'尺码:44.5,颜色分类:【A款】-深藏青/荧光绿/火花红【热卖推荐】','22件');
insert into ego_product values(null,33,239.00,'尺码:44.5,颜色分类:【A款】-黑/安踏白【热卖推荐】','10件');
insert into ego_product values(null,33,239.00,'尺码:44.5,颜色分类:【A款】-安踏白/淡灰','27件');

insert into ego_product values(null,34,239.00,'尺码:39,颜色分类:黑/燕麦灰-1','307件');
insert into ego_product values(null,34,239.00,'尺码:39,颜色分类:二度灰/金属金/象牙白','116件');
insert into ego_product values(null,34,239.00,'尺码:39,颜色分类:黑/大学红/象牙白-5','71件');
insert into ego_product values(null,34,239.00,'尺码:40,颜色分类:黑/燕麦灰-1','983件');
insert into ego_product values(null,34,239.00,'尺码:40,颜色分类:二度灰/金属金/象牙白','252件');
insert into ego_product values(null,34,239.00,'尺码:40,颜色分类:黑/大学红/象牙白-5','117件');
insert into ego_product values(null,34,239.00,'尺码:40.5,颜色分类:黑/燕麦灰-1','46件');
insert into ego_product values(null,34,239.00,'尺码:40.5,颜色分类:二度灰/金属金/象牙白','77件');
insert into ego_product values(null,34,239.00,'尺码:40.5,颜色分类:黑/大学红/象牙白-5','36件');
insert into ego_product values(null,34,239.00,'尺码:41,颜色分类:黑/燕麦灰-1','1496件');
insert into ego_product values(null,34,239.00,'尺码:41,颜色分类:二度灰/金属金/象牙白','461件');
insert into ego_product values(null,34,239.00,'尺码:41,颜色分类:黑/大学红/象牙白-5','198件');
insert into ego_product values(null,34,239.00,'尺码:42,颜色分类:黑/燕麦灰-1','1411件');
insert into ego_product values(null,34,239.00,'尺码:42,颜色分类:二度灰/金属金/象牙白','428件');
insert into ego_product values(null,34,239.00,'尺码:42,颜色分类:黑/大学红/象牙白-5','175件');
insert into ego_product values(null,34,239.00,'尺码:42.5,颜色分类:黑/燕麦灰-1','40件');
insert into ego_product values(null,34,239.00,'尺码:42.5,颜色分类:二度灰/金属金/象牙白','77件');
insert into ego_product values(null,34,239.00,'尺码:42.5,颜色分类:黑/大学红/象牙白-5','32件');
insert into ego_product values(null,34,239.00,'尺码:43,颜色分类:黑/燕麦灰-1','985件');
insert into ego_product values(null,34,239.00,'尺码:43,颜色分类:二度灰/金属金/象牙白','200件');
insert into ego_product values(null,34,239.00,'尺码:43,颜色分类:黑/大学红/象牙白-5','88件');
insert into ego_product values(null,34,239.00,'尺码:44.5,颜色分类:黑/燕麦灰-1','370件');
insert into ego_product values(null,34,239.00,'尺码:44.5,颜色分类:二度灰/金属金/象牙白','74件');
insert into ego_product values(null,34,239.00,'尺码:44.5,颜色分类:黑/大学红/象牙白-5','37件');

insert into ego_product values(null,35,1199.00,'尺码:40,颜色分类:100灰色','6件');
insert into ego_product values(null,35,1199.00,'尺码:40,颜色分类:002黑色','0件');
insert into ego_product values(null,35,1199.00,'尺码:41,颜色分类:100灰色','7件');
insert into ego_product values(null,35,1199.00,'尺码:41,颜色分类:002黑色','0件');
insert into ego_product values(null,35,1199.00,'尺码:42,颜色分类:100灰色','50件');
insert into ego_product values(null,35,1199.00,'尺码:42,颜色分类:002黑色','0件');
insert into ego_product values(null,35,1199.00,'尺码:42.5,颜色分类:100灰色','50件');
insert into ego_product values(null,35,1199.00,'尺码:42.5,颜色分类:002黑色','0件');
insert into ego_product values(null,35,1199.00,'尺码:43,颜色分类:100灰色','59件');
insert into ego_product values(null,35,1199.00,'尺码:43,颜色分类:002黑色','36件');
insert into ego_product values(null,35,1199.00,'尺码:44.5,颜色分类:100灰色','0件');
insert into ego_product values(null,35,1199.00,'尺码:44.5,颜色分类:002黑色','24件');

insert into ego_product values(null,36,780.00,'尺码:39,颜色分类:集团白-WT','43件');
insert into ego_product values(null,36,780.00,'尺码:39,颜色分类:藕荷色/集团白-WV','18件');
insert into ego_product values(null,36,780.00,'尺码:40,颜色分类:集团白-WT','104件');
insert into ego_product values(null,36,780.00,'尺码:40,颜色分类:藕荷色/集团白-WV','33件');
insert into ego_product values(null,36,780.00,'尺码:40.5,颜色分类:集团白-WT','76件');
insert into ego_product values(null,36,780.00,'尺码:40.5,颜色分类:藕荷色/集团白-WV','28件');
insert into ego_product values(null,36,780.00,'尺码:41,颜色分类:集团白-WT','195件');
insert into ego_product values(null,36,780.00,'尺码:41,颜色分类:藕荷色/集团白-WV','58件');
insert into ego_product values(null,36,780.00,'尺码:42,颜色分类:集团白-WT','195件');
insert into ego_product values(null,36,780.00,'尺码:42,颜色分类:藕荷色/集团白-WV','59件');
insert into ego_product values(null,36,780.00,'尺码:42.5,颜色分类:集团白-WT','81件');
insert into ego_product values(null,36,780.00,'尺码:42.5,颜色分类:藕荷色/集团白-WV','23件');
insert into ego_product values(null,36,780.00,'尺码:43,颜色分类:集团白-WT','78件');
insert into ego_product values(null,36,780.00,'尺码:43,颜色分类:藕荷色/集团白-WV','27件');
insert into ego_product values(null,36,780.00,'尺码:44.5,颜色分类:集团白-WT','0件');
insert into ego_product values(null,36,780.00,'尺码:44.5,颜色分类:藕荷色/集团白-WV','5件');

insert into ego_product values(null,37,1299.00,'尺码:39,颜色分类:DV6225-白色/蓝色','7件');
insert into ego_product values(null,37,1299.00,'尺码:40,颜色分类:DV6225-白色/蓝色','5件');
insert into ego_product values(null,37,1299.00,'尺码:40.5,颜色分类:DV6225-白色/蓝色','3件');
insert into ego_product values(null,37,1299.00,'尺码:41,颜色分类:DV6225-白色/蓝色','11件');
insert into ego_product values(null,37,1299.00,'尺码:42,颜色分类:DV6225-白色/蓝色','4件');
insert into ego_product values(null,37,1299.00,'尺码:42.5,颜色分类:DV6225-白色/蓝色','7件');
insert into ego_product values(null,37,1299.00,'尺码:43,颜色分类:DV6225-白色/蓝色','7件');

insert into ego_product values(null,38,899.00,'尺码:39,颜色分类:FU6828-黑色/橘色','76件');
insert into ego_product values(null,38,899.00,'尺码:39,颜色分类:DV6359-中麻灰','9件');
insert into ego_product values(null,38,899.00,'尺码:40,颜色分类:FU6828-黑色/橘色','90件');
insert into ego_product values(null,38,899.00,'尺码:40,颜色分类:DV6359-中麻灰','9件');
insert into ego_product values(null,38,899.00,'尺码:40.5,颜色分类:FU6828-黑色/橘色','102件');
insert into ego_product values(null,38,899.00,'尺码:40.5,颜色分类:DV6359-中麻灰','9件');
insert into ego_product values(null,38,899.00,'尺码:41,颜色分类:FU6828-黑色/橘色','169件');
insert into ego_product values(null,38,899.00,'尺码:41,颜色分类:DV6359-中麻灰','9件');
insert into ego_product values(null,38,899.00,'尺码:42,颜色分类:FU6828-黑色/橘色','175件');
insert into ego_product values(null,38,899.00,'尺码:42,颜色分类:DV6359-中麻灰','14件');
insert into ego_product values(null,38,899.00,'尺码:42.5,颜色分类:FU6828-黑色/橘色','170件');
insert into ego_product values(null,38,899.00,'尺码:42.5,颜色分类:DV6359-中麻灰','12件');
insert into ego_product values(null,38,899.00,'尺码:43,颜色分类:FU6828-黑色/橘色','171件');
insert into ego_product values(null,38,899.00,'尺码:43,颜色分类:DV6359-中麻灰','21件');

insert into ego_product values(null,39,780.00,'尺码:39,颜色分类:黑色-BK','0件');
insert into ego_product values(null,39,780.00,'尺码:39,颜色分类:集团白-WT','7件');
insert into ego_product values(null,39,780.00,'尺码:40,颜色分类:黑色-BK','22件');
insert into ego_product values(null,39,780.00,'尺码:40,颜色分类:集团白-WT','39件');
insert into ego_product values(null,39,780.00,'尺码:40.5,颜色分类:黑色-BK','37件');
insert into ego_product values(null,39,780.00,'尺码:40.5,颜色分类:集团白-WT','37件');
insert into ego_product values(null,39,780.00,'尺码:41,颜色分类:黑色-BK','102件');
insert into ego_product values(null,39,780.00,'尺码:41,颜色分类:集团白-WT','87件');
insert into ego_product values(null,39,780.00,'尺码:42,颜色分类:黑色-BK','124件');
insert into ego_product values(null,39,780.00,'尺码:42,颜色分类:集团白-WT','85件');
insert into ego_product values(null,39,780.00,'尺码:42.5,颜色分类:黑色-BK','66件');
insert into ego_product values(null,39,780.00,'尺码:42.5,颜色分类:集团白-WT','30件');
insert into ego_product values(null,39,780.00,'尺码:43,颜色分类:黑色-BK','32件');
insert into ego_product values(null,39,780.00,'尺码:43,颜色分类:集团白-WT','39件');
insert into ego_product values(null,39,780.00,'尺码:44.5,颜色分类:黑色-BK','6件');
insert into ego_product values(null,39,780.00,'尺码:44.5,颜色分类:集团白-WT','1件');

insert into ego_product values(null,40,369.00,'尺码:39,颜色分类:黑/夏威夷蓝/雾灰','141件');
insert into ego_product values(null,40,369.00,'尺码:39,颜色分类:黑/中灰/安踏白','72件');
insert into ego_product values(null,40,369.00,'尺码:40,颜色分类:黑/夏威夷蓝/雾灰','126件');
insert into ego_product values(null,40,369.00,'尺码:40,颜色分类:黑/中灰/安踏白','109件');
insert into ego_product values(null,40,369.00,'尺码:40.5,颜色分类:黑/夏威夷蓝/雾灰','126件');
insert into ego_product values(null,40,369.00,'尺码:40.5,颜色分类:黑/中灰/安踏白','66件');
insert into ego_product values(null,40,369.00,'尺码:41,颜色分类:黑/夏威夷蓝/雾灰','197件');
insert into ego_product values(null,40,369.00,'尺码:41,颜色分类:黑/中灰/安踏白','133件');
insert into ego_product values(null,40,369.00,'尺码:42,颜色分类:黑/夏威夷蓝/雾灰','190件');
insert into ego_product values(null,40,369.00,'尺码:42,颜色分类:黑/中灰/安踏白','129件');
insert into ego_product values(null,40,369.00,'尺码:42.5,颜色分类:黑/夏威夷蓝/雾灰','90件');
insert into ego_product values(null,40,369.00,'尺码:42.5,颜色分类:黑/中灰/安踏白','53件');
insert into ego_product values(null,40,369.00,'尺码:43,颜色分类:黑/夏威夷蓝/雾灰','117件');
insert into ego_product values(null,40,369.00,'尺码:43,颜色分类:黑/中灰/安踏白','67件');
insert into ego_product values(null,40,369.00,'尺码:44.5,颜色分类:黑/夏威夷蓝/雾灰','43件');
insert into ego_product values(null,40,369.00,'尺码:44.5,颜色分类:黑/中灰/安踏白','33件');

insert into ego_index_carousel values(null,1,'','/pic/index/banner1.jpg');
insert into ego_index_carousel values(null,1,'','/pic/index/banner2.jpg');
insert into ego_index_carousel values(null,1,'','/pic/index/banner3.jpg');
insert into ego_index_carousel values(null,1,'','/pic/index/banner4.jpg');

insert into ego_index_topSale values(null,5,'岚纹修身运动外套','/pic/jianshenfuzhuang/E/product_pic/2.jpg');
insert into ego_index_topSale values(null,35,'安德玛UA男子HOVRApex运动鞋','/pic/yundongxie/C/product_pic/5.jpg');
insert into ego_index_topSale values(null,19,'家用小型磁控踏步健身器材','/pic/jianshenqicai/C/product_pic/5.jpg');
insert into ego_index_topSale values(null,12,'脚踝护具','/pic/jianshenhuju/D/product_pic/5.jpg');
insert into ego_index_topSale values(null,22,'多功能踏步机','/pic/jianshenqicai/F/product_pic/5.jpg');
insert into ego_index_topSale values(null,6,'篮球跑步健身房运动健身衣','/pic/jianshenfuzhuang/F/product_pic/1.jpg');