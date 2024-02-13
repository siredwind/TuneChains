import PropTypes from "prop-types";
import { socialMediaArray } from "../../utils/constants";

const SocialLinksFields = ({ data, showSocialLinks, onChange }) => {
    return (
        <>
            {showSocialLinks && (
                <div className="space-y-4 mt-4">
                    {socialMediaArray.map((socialMedia) => (
                        <div key={socialMedia}>
                            <label className="text-white capitalize">{socialMedia}</label>
                            <input
                                type="url"
                                name={socialMedia}
                                value={data[socialMedia]}
                                onChange={onChange}
                                placeholder={`Enter ${socialMedia} URL`}
                                className="w-full px-4 py-2 text-white bg-gray-700 rounded-md focus:ring focus:ring-blue-500"
                            />
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

SocialLinksFields.propTypes = {
    data: PropTypes.object,
    showSocialLinks: PropTypes.bool,
    onChange: PropTypes.func
};

export default SocialLinksFields;