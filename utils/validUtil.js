//去除空格
function trim(prmStr) {
    if (prmStr == null) {
        return "";
    } else {
        prmStr = prmStr + "";
        return prmStr.replace(/(^\s*)|(\s*$)/g, "");
    }
}

/**
 * 手机号码校验
 *
 * @param mobile
 * @returns boolean
 */
function isMobile(mobile) {
    if (trim(mobile) === "") {
        return true;
    }
    const filter =
        /^((13[0-9])|(14[1|4|5|6|7|8|9])|(15([0|1|2|3|5|6|7|8|9]))|(16[2|5|6|7])|(17[0|1|2|3|5|6|7|8])|(18[0-9])|(19[1|8|9]))\d{8}$/;
    return filter.test(mobile);
}

/**
 * 电子邮箱校验
 *
 * @param mail
 * @returns boolean
 */
function isEmail(mail) {
    if (trim(mail) === "") {
        return true;
    }
    const filter =
        /^[A-Za-z0-9-._]+@[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,6})$/;
    return filter.test(mail);
}

/**
 * 固定电话号码校验
 *
 * @param telephone
 * @returns boolean
 */ function isTelephone(telephone) {
    if (trim(telephone) === "") {
        return true;
    }

    const filter = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
    return filter.test(telephone);
}

/**
 * 数字校验校验
 *
 * @param value
 * @returns boolean
 */
function isNumber(value) {
    if (trim(value) === "") {
        return true;
    }
    const filter = /(^[1-9]\d*$)/;
    return filter.test(value);
}

//判断字符串为空

function isNull(str) {
    if (str == null || str === "undefined" || str === "") {
        return true;
    }
} //判断字符串非空

function isNotNull(str) {
    if (str !== null && str !== "undefined" && str !== "") {
        return true;
    }
}

export {trim, isMobile, isEmail, isTelephone, isNumber, isNull, isNotNull};